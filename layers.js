var layers = 
{
    'osm.base':
    {
        "url": "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "maxZoom": 18,
        "attribution": "Map data &copy; <a href=http://openstreetmap.org>OpenStreetMap</a>",
        "id":  "osm.base"
    },
    'gridmaps.kaduna':
    {
        "url": "http://kaduna-tiles.gridmaps.org:20008/tile/oync-default/{z}/{x}/{y}.png?cache_bust={cache_bust}",
        "maxZoom": 18,
        "attribution": "SEL@Columbia University &copy; <a href=http://sel.columbia.edu>SEL</a>",
        "id":  "gridmaps.kaduna"
    }
};

module.exports = layers;
