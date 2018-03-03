var mapOffline;



function loadImage(src){
    alert('allo')

    //	Create our FileReader and run the results through the render function.
    var reader = new FileReader();

    reader.readAsDataURL(src);
}

mapOffline = new ol.Map({
    layers: [
        new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: loadImage(cordova.file.applicationStorageDirectory + 'carte1.png'),
                projection: 'EPSG:3857',
                imageExtent: [-8236392.15,6112010.85,-8016253.51,6488692.53],
                crossOrigin:'anonymous'
            })
       })
   ],
   target: 'mapOffline',
   view: new ol.View({
       projection: 'EPSG:3857',
       center: [-8126322.83,6300351.69],
       zoom: 8,
       view: view,
       maxZoom: 12,
       controls: ol.control.defaults().extend([
           // new ol.control.FullScreen(),
           new app.RotateNorthControl(),
           new ol.control.ScaleLine(),
           // new ol.control.ZoomSlider(),
           // mousePositionControl,
       ]),
       interactions: ol.interaction.defaults().extend([
           new ol.interaction.DragRotateAndZoom()
       ])
   })
});
