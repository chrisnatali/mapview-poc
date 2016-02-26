// quantize coordinate space into 65536 {0..65535} units
var lon2x = function(lon) {
    return Math.round(((lon + 180)/360) * 65535);
}

var lat2y = function(lat) {
    return Math.round(((lat + 90)/180) * 65535);
}

var x2lon = function(x) { 
    return ((x / 65535) * 360) - 180;
}

var y2lat = function(y) { 
    return ((y / 65535) * 180) - 90;
}

var tile = function(x, y) {
    var tile = 0;
    var mask = Math.pow(2, 15);
    // keep track of the shift we need to apply to
    // x and y to interleave in tile
    var shift_left = 16;
    while(mask > 0) {
        tile = ((mask & x) << shift_left) | tile;
        shift_left--;
        tile = ((mask & y) << shift_left) | tile;
        mask >>= 1;
    }
    return tile;
}
   
var x_y = function(tile) {
    var x = 0,
        y = 0;

    var mask = Math.pow(2, 31);
    var shift_right = 16;
    // note that we use `>>>` to shift in 0's from the left
    // as these are treated as signed numbers without that
    while(mask > 0) {
        x = ((mask & tile) >>> shift_right) | x;
        shift_right--;
        mask >>>= 1;
        y = ((mask & tile) >>> shift_right) | y;
        mask >>>= 1;
    }
    return [x, y];
}
 
// convert quantized lon, lat into interleaved tile key
var lat_lon2tile = function(lon, lat) {
    var x = lon2x(lon);
    var y = lat2y(lat);
    return tile(x, y);
}

var tile2lat_lon = function(tile) {
    var xy_arr = x_y(tile);
    return [x2lon(xy_arr[0]), y2lat(xy_arr[1])];
}
   
exports.lon2x=lon2x;
exports.lat2y=lat2y;
exports.x2lon=x2lon;
exports.y2lat=y2lat;
exports.tile=tile;
exports.x_y=x_y;
exports.lat_lon2tile=lat_lon2tile;
exports.tile2lat_lon=tile2lat_lon;
