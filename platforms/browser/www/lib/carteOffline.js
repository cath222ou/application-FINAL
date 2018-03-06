var mapOffline;

function initializeMap(extent1,extent2,extent3,extent4, zoom, centre1, centre2, path){
    var extentTot = [parseFloat(extent1),parseFloat(extent2),parseFloat(extent3),parseFloat(extent4)];
    var centreTot = [parseFloat(centre1),parseFloat(centre2)]

    console.log(extentTot)
    mapOffline = new ol.Map({
        layers: [
            new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url:  'image/map_2.png',//path
                    projection: 'EPSG:3857',
                    imageExtent: extentTot,//[-8236392.15,6112010.85,-8016253.51,6488692.53],
                    crossOrigin:'anonymous'
                })
            })
        ],
        target: 'mapOffline',
        view: new ol.View({
             projection: 'EPSG:3857',
            center: centreTot,//[-8126322.83,6300351.69],
            zoom: zoom,//8,
            view: view,
            maxZoom: 12,
            controls: ol.control.defaults().extend([
                // new ol.control.FullScreen(),
                // new app.RotateNorthControl(),
                new ol.control.ScaleLine(),
                // new ol.control.ZoomSlider(),
                // mousePositionControl,
            ]),
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ])
        })
    });
}