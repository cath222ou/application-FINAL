//Fonction  nécessaire pour l'accordéon de la légende
$( function() {
    $( "#accordion" ).accordion({
        heightStyle: "content"
    });
} );


//Afficher la division Carte
$('#carte').addClass('hidden');


//Affichage de la carte en ligne (bouton Carte)
$("#carteBtn").click(function() {
    //L'afficher s'il y a une connexion internet
    if (navigator.onLine === true) {
        $('#couche').removeClass('hidden');
        $('#carte').removeClass('hidden');
        $('#accueil').addClass('hidden');

        //Refermer tout les accordions
        $('#catalogHeading1').addClass('collapsed');
        $('#catalogHeading2').addClass('collapsed');
        $('#catalogHeading3').addClass('collapsed');
        $('#catalogHeading4').addClass('collapsed');
        $('#catalog1').removeClass('in');
        $('#catalog2').removeClass('in');
        $('#catalog3').removeClass('in');
        $('#catalog4').removeClass('in');

        //Rencentrer la carte au zoom initial
        map.getView().setCenter(ol.proj.transform([lonCenter, latCenter], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(zoomCenter)

    }
    //Si aucune connexion
    else {
        alert("Vous n'avez pas d'accès internet")
    }
});

//Afficher la division Mes Cartes (bouton Mes Cartes)
$("#mesCartesBtn").click(function() {
    $('#mesCartes').removeClass('hidden');
    $('#accueil').addClass('hidden');
});

//Afficher la division Accueil
$("#retour1").click(function() {
    $('#couche').addClass('hidden');
    $('#carte').addClass('hidden');
    $('#accueil').removeClass('hidden');
    //Réinitialiser les couches visibles
    OSM.setVisible(true);
    ImageryMapbox.setVisible(false);
    EsriTopo.setVisible(false);
    EsriImagery.setVisible(false);
    Groupe_IQH1.setVisible(false);
    Groupe_IQH2.setVisible(false);
    Groupe_IQH3.setVisible(false);
    Groupe_IQH4.setVisible(false);
    Groupe_IQH5.setVisible(false);
    Groupe_IQH6.setVisible(false);
    Groupe_IQH7.setVisible(false);
    precipitation_6h.setVisible(false);
    temperature.setVisible(false);
    temperature.setOpacity(0.7);
    Groupe_Meteo.setVisible(false);
    hydro.setVisible(false);
    route.setVisible(false);
    chemin.setVisible(false);
    Groupe_Topo.setVisible(false);
    map.getLayers().forEach(function(layer, i) {
        if (i < 10){
            bindInputs('#layer' + i, layer);
        }
        if (i === 10){
            var h = i + 3;
            bindInputs('#layer' + h, layer);
        }
        if (layer instanceof ol.layer.Group) {
            if (i < 10) {
                layer.getLayers().forEach(function (sublayer, j) {
                    bindInputs('#layer' + i + j, sublayer);
                });
            }
            if (i === 10) {
                var h = i + 3;
                layer.getLayers().forEach(function (sublayer, j) {
                    bindInputs('#layer' + h + j, sublayer);
                });
            }
        }
    });
});

//Afficher la division Accueil à partir de Mes cartes
$("#retour2").click(function() {
    $('#mesCartes').addClass('hidden');
   // $('#mesCartesHorsligne').addClass('hidden');
    $('#accueil').removeClass('hidden');
});


//Affichier la division mesCartes
$("#retour3").click(function() {
    $('#mesCartesHorsligne').addClass('hidden');
    $('#mesCartes').removeClass('hidden');
    endLocalisation()
});

//Afficher la barre de recherche de localisation
$("#barreRecheche").click(function() {
    $('#rechercheLocalisation').removeClass('hidden');
    $('#boutons').addClass('hidden');
});

//Fermer la barre de recherche de localisation
$("#finRecherche").click(function() {
    $('#rechercheLocalisation').addClass('hidden');
    $('#boutons').removeClass('hidden');
});







/////////////////////////////////////////////////////////////////
// function getTileURL(coord, zoom) {
//     cor = ol.proj.transform([coord[0], coord[1]], 'EPSG:3857', 'EPSG:4326');
//     // cor = transform2(coord[0], coord[1]);
//     lon = cor[0];
//     lat = cor[1];
//     var out = [];
//     var xtile = parseInt(Math.floor((lon + 180) / 360 * (1 << zoom)));
//     var ytile = parseInt(Math.floor((1 - Math.log(Math.tan(lat.toRad()) + 1 / Math.cos(lat.toRad())) / Math.PI) / 2 * (1 << zoom)));
//     out[0] = zoom;
//     out[1] = xtile;
//     out[2] = ytile;
//     return out;
// }
// if (typeof(Number.prototype.toRad) === "undefined") {
//     Number.prototype.toRad = function() {
//         return this * Math.PI / 180;
//     }
// }
// var remoteTilesOSM = [];
//
//
// function getAllOSMTiles(coord1, coord2, nivZoom, sourceTile) {
//     var tileUrlFunction = sourceTile.getTileUrlFunction();
//     out1 = getTileURL(coord1, nivZoom);
//     out2 = getTileURL(coord2, nivZoom);
//
//     if (out1[1] > out2[1]) {
//         outTmp1 = out1[1];
//         out1[1] = out2[1];
//         out2[1] = outTmp1;
//     }
//     if (out1[2] > out2[2]) {
//         outTmp1 = out1[2];
//         out1[2] = out2[2];
//         out2[2] = outTmp1;
//     }
//
//     while (out1[1] <= out2[1]) {
//         var resetLoop = out1[2];
//         while (out1[2] <= out2[2]) {
//             var tileURL = tileUrlFunction([out1[0], out1[1], -out1[2] - 1], ol.has.DEVICE_PIXEL_RATIO, ol.proj.get('EPSG:3857'));
//             var uri = encodeURI(tileURL);
//             remoteTilesOSM.push(uri);
//             out1[2]++;
//         }
//         out1[2] = resetLoop;
//         out1[1] += 1;
//     }
//     console.log(out1[0],out1[1],out1[2]-1)
//     console.log(tileURL)
//
// }
//
//
// function tileSaverOSMStart() {
//     $('#Searching_Modal').modal('show')
//     var niveauxZoom = [10, 12, 13, 14, 15, 16, 17];
//     sourceTile = iqh1_WMS.getSource();
//     console.log('allo',sourceTile)
//     // var EmpSource = PolyEmprise.getSource();
//     // EmpSource.forEachFeature(function(feature){
//     //
//     //     var featGeom = feature.getGeometry();
//     //     var featExtent = featGeom.getExtent();
//
//
//         featExtent = map.getView().calculateExtent(map.getSize())
//         var lenZoom = niveauxZoom.length;
//         for (i = 0; i < lenZoom; i++) {
//             getAllOSMTiles([featExtent[0], featExtent[1]], [featExtent[2], featExtent[3]], niveauxZoom[i], sourceTile)
//         }
//     // })
// }
//
// function tileSaverOSMStart2() {
//     $('#Searching_Modal').modal('show')
//     var niveauxZoom = [10, 12, 13, 14, 15, 16, 17];
//     sourceTile = OSM.getSource();
//     console.log('allo',sourceTile)
//     // var EmpSource = PolyEmprise.getSource();
//     // EmpSource.forEachFeature(function(feature){
//     //
//     //     var featGeom = feature.getGeometry();
//     //     var featExtent = featGeom.getExtent();
//
//
//     featExtent = map.getView().calculateExtent(map.getSize())
//     var lenZoom = niveauxZoom.length;
//     for (i = 0; i < lenZoom; i++) {
//         getAllOSMTiles([featExtent[0], featExtent[1]], [featExtent[2], featExtent[3]], niveauxZoom[i], sourceTile)
//     }
//     // })
// }
// //
// //
// //
// //
// //
// $("#download").click(function() {
//     poly = map.getView().calculateExtent(map.getSize());
//
//     var convertedCoordinates = [[poly[0],poly[1]], [poly[2],poly[1]], [poly[0],poly[3]], [poly[2],poly[3]]];
//
//     var polygonGeometry = new ol.geom.Polygon([convertedCoordinates])
//     var polygonFeature = new ol.Feature({ geometry : polygonGeometry });
//
//     var vectorSource = new ol.source.Vector();
//     vectorSource.addFeature(polygonFeature);
//
//     var PolyEmprise = new ol.layer.Vector({
//         source: vectorSource
//     });
//
//     tileSaverOSMStart()
//     tileSaverOSMStart2()
//     // console.log(OSM.getSource())
//     // console.log(map.getView().calculateExtent(map.getSize()))
// });
////////////////////////////////////////////////////////////////
//
// var source = OSM.getSource();
// var tileUrlFunction = source.getTileUrlFunction();
//
// var loadTile = function (evt) {
//     source_url = tileUrlFunction(evt.tile.getTileCoord(), 1, ol.proj.get('EPSG:3857'));
//     console.log(source_url);
// };
//
// $("#download").click(function() {
//     // map.getView().setZoom(map.getView().getZoom()-1);
//     zoom = [10, 11];
//     map.getView().setZoom(zoom[0]-1);
//
//     // source.on('tileloadend', loadTile);
//
//     // return new Promise(function (resolve) {
//     //     source.on("tileloadend", function tileLoad() {
//     //         source.un("tileloadend", tileLoad);
//     //         //call any handler you want here, if needed
//     //         resolve();
//     //     });
//     // });
//     var promesse = function () {
//         return new Promise(function (resolve, reject) {
//             source.on("tileloadstart", function Tileload(evt) {
//                 source_url = tileUrlFunction(evt.tile.getTileCoord(), 1, ol.proj.get('EPSG:3857'));
//                 // console.log(source_url);
//             });
//             resolve();
//         });
//     };
//
//     for (var i = 0; i < zoom.length; i++) {
//         map.getView().setZoom(zoom[i]);
//         promesse(zoom[i]).then(function () {
//             console.log(source_url);
//         });
//     }
//
//         // var test = new Promise(function () {
//         //
//         //
//         //         source.on("tileloadstart", function Tileload(evt) {
//         //             source_url = tileUrlFunction(evt.tile.getTileCoord(), 1, ol.proj.get('EPSG:3857'));
//         //             console.log(source_url);
//         //         });
//         //
//         //
//         //     ;
//         // });
//
//
//
//         // if  (i = zoom.length){
//         //     source.un('tileloadend', loadTile)
//         // }
// });

    // function (evt) {
        //     console.log(evt.tile)
    //     source_url = tileUrlFunction(evt.tile.getTileCoord(), 1, ol.proj.get('EPSG:3857'));
    //     console.log(source_url);
        // localStorage.setItem('layerUrl' , source_url );
        // console.log('local'+ localStorage.getItem('layerUrl'));

        // evt.preventDefault(true);
        // console.log('allo'+preventDefault)

    // });


