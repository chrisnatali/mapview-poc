map = function() {

  var layers = undefined,
      views = undefined,
      leaflet = undefined,
      map_element = 'map',
      onMoveEnd = function() { },
      _map = undefined;
      
  function map(view_id, view_x, view_y, view_zoom) {
      // get current or default view 
      var view = views.hasOwnProperty(view_id) ? views[view_id] : views[Object.keys(views)[0]];
      view_x = view_x || view.center.x;
      view_y = view_y || view.center.y;
      view_zoom = view_zoom || view.zoom;

      // handle initial and reload cases
      if(_map == undefined) {
        _map = leaflet.map(map_element);
        _map.on('moveend', function() { onMoveEnd(_map); });
      } else {  //reload
        _map.remove();
        _map = leaflet.map(map_element);
        _map.on('moveend', function() { onMoveEnd(_map); });
      }
      _map.setView([view_y, view_x], view_zoom);
      var view_layers = view.layers.map(function(layer_id) { return layers[layer_id]; });
      // add layers in sorted order
      for(i = 0; i < view_layers.length; i++) {
          layer = view_layers[i];
          leaflet.tileLayer(layer.url, { 
                            attribution: layer.attribution, 
                            maxZoom: layer.maxZoom,
                            id: layer.id,
                            cache_bust:  function() { return Math.random(); }
          }).addTo(_map);
      };
  };

  map.layers = function(_) {
    if (!arguments.length) return layers;
    layers = _;
    return map;
  };

  map.views = function(_) {
    if (!arguments.length) return views;
    views = _;
    return map;
  };

  map.leaflet = function(_) {
    if (!arguments.length) return leaflet;
    leaflet = _;
    return map;
  };

  map.map_element = function(_) {
    if (!arguments.length) return map_element;
    map_element = _;
    return map;
  };

  map.onMoveEnd = function(_) {
    if (!arguments.length) return onMoveEnd;
    onMoveEnd = _;
    return map;
  };

  map.getMap = function() { 
    return _map;
  };

  return map;
};
