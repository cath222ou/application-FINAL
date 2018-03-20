
$('#gps').click(function(){
    navigator.geolocation.watchPosition(geolocationSuccess,
    onError,
        {timeout: 5000})
});

function geolocationSuccess(position) {

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon, lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

    pointCoord.setCoordinates([coord[0],coord[1]])
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

