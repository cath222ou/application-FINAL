var mapOffline;
var trackFeature;
var trackLayer;
var sourceVector;
var pointCoord;


//Création de la carte selon la carte sélectionnée
function initializeMap(extent1,extent2,extent3,extent4, zoom, centre1, centre2, path){
    $("#mapOffline").empty();

    var extentTot = [parseFloat(extent1),parseFloat(extent2),parseFloat(extent3),parseFloat(extent4)];
    var centreTot = [parseFloat(centre1),parseFloat(centre2)];

    var imageCarte = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: path,//'image/map_2.png',
            projection: 'EPSG:3857',
            imageExtent: extentTot,//[-8236392.15,6112010.85,-8016253.51,6488692.53],
            crossOrigin:'anonymous'
        })
    });

        pointCoord = new ol.geom.Point([]);

        trackFeature = new ol.Feature({
            geometry: pointCoord
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

        sourceVector =  new ol.source.Vector({
            features: [trackFeature]
        })

        //view.setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
        trackLayer = new ol.layer.Vector({
            source: sourceVector,
            visible: true,
        });

    mapOffline = new ol.Map({
        layers: [imageCarte, trackLayer],
        target: 'mapOffline',
        view: new ol.View({
            projection: 'EPSG:3857',
            center: centreTot,//[-8126322.83,6300351.69],
            zoom: zoom,//8,
            view: view,
            //minZoom: zoom,
            controls: ol.control.defaults().extend([
                // new ol.control.FullScreen(),
                // new app.RotateNorthControl(),
                new ol.control.ScaleLine()
                // new ol.control.ZoomSlider(),
                // mousePositionControl,
            ]),
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ])
        })
    });
}