
var watchId;

$('#gps').click(function(){
    watchId = navigator.geolocation.watchPosition(geolocationSuccess,
    onError,
        {timeout: 5000})
    $('#gps').addClass('hidden');
    $('#gpsFin').removeClass('hidden');
});

function geolocationSuccess(position) {


    var features = sourceVector.getFeatures()
    var featureToUpdate = features[0]

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon, lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
   // featureToUpdate.set('geometry', new ol.geom.Point([coord[0],coord[1]]));
    featureToUpdate.getGeometry().setCoordinates([coord[0],coord[1]])
    alert(lat+lon)

    //var features = sourceVector.getFeatures()
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


$('#gpsFin').click(function(){
    navigator.geolocation.clearWatch(watchId);
    $('#gpsFin').addClass('hidden');
    $('#gps').removeClass('hidden');
});