
$('#gps').click(function(){
    navigator.geolocation.watchPosition(geolocationSuccess,
    onError,
        {timeout: 5000})
});

function geolocationSuccess(position) {


    var features = sourceVector.getFeatures()
    var featureToUpdate = features[0]

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon, lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
   // featureToUpdate.set('geometry', new ol.geom.Point([coord[0],coord[1]]));
    featureToUpdate.getGeometry(pointCoord).setCoordinates([coord[0],coord[1]])

    //var features = sourceVector.getFeatures()
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

