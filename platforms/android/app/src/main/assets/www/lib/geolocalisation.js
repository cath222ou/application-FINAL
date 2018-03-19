
$('#gps').click(function(){
    navigator.geolocation.watchPosition(geolocationSuccess,
    onError,
        {timeout: 5000})
});

function geolocationSuccess(position){

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lon,lat);

    var coord = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

    var trackFeature = new ol.Feature({
        geometry: new ol.geom.Point([
            coord[0],coord[1]
        ])
    });

    var styleMarker = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            snapToPixel: false,
            fill: new ol.style.Fill({
                color: '#3399CC'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2
            })
        })
    });
    trackFeature.setStyle(styleMarker);

    //view.setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    var trackLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [trackFeature]
        }),
        visible: true,
    });
    mapOffline.removeLayer(trackLayer);
    mapOffline.addLayer(trackLayer);
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

