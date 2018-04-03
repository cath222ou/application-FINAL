
var watchId;

//Début du suivi GPS
$('#gps').click(function(){
    watchId = navigator.geolocation.watchPosition(geolocationSuccess,
    onError,
        {timeout: 5000});
    $('#gps').addClass('hidden');
    $('#gpsFin').removeClass('hidden');
});

//Creation de point sur la carte de la géolocalisation
function geolocationSuccess(position) {
    var features = sourceVector.getFeatures();
    var featureToUpdate = features[0];

    //Position retourner par la fonction navigator.geolocation.watchPosition
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon, lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');
    featureToUpdate.getGeometry().setCoordinates([coord[0],coord[1]]);
}

//Erreur de localisation
function onError(error) {
    console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    if (error.code == 3){
        alert('Localisation impossible. Veuillez vérifier que votre GPS est activé sur votre appareil mobile')
    }
}

//Fin de suivi GPS et effacer le point sur la carte de la géolocalisation
$('#gpsFin').click(function(){
    endLocalisation();
    var features = sourceVector.getFeatures();
    var featureToUpdate = features[0];
    featureToUpdate.getGeometry().setCoordinates([]);
});

function endLocalisation(){
    $('#gpsFin').addClass('hidden');
    $('#gps').removeClass('hidden');
    navigator.geolocation.clearWatch(watchId);
}