
    /** Définition du centre et du zoom sur la carte au démarrage **/
    var latCenter = 49.15;
    var lonCenter = -73;
    var zoomCenter = 8;


    /** Définition des couches de base (basemap) et création de deux groupes de données : groupe_OpenData qui contient la couche OSM et groupe_Basemap qui contient les couches ESRI**/

    var ImageryMapbox = new ol.layer.Tile({
        source: new ol.source.XYZ({
            maxZoom: 17,
            url: 'http://api.tiles.mapbox.com/v4/alexandrecaron.llljl7kh/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxleGFuZHJlY2Fyb24iLCJhIjoiTlR2V0J5OCJ9.ynXXZ7pn3GV3Zk9hczwtTg',
        }), name: 'Imagerie Mapbox'
    });
    ImageryMapbox.setVisible(false);

    var EsriTopo = new ol.layer.Tile({
        source: new ol.source.XYZ({
            maxZoom: 18,
            attributions: [new ol.Attribution({html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' + 'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'})],
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        }), name: 'Topographie ESRI'
    });
    EsriTopo.setVisible(false);

    var EsriImagery = new ol.layer.Tile({
        source: new ol.source.XYZ({
            maxZoom: 17,
            attributions: [new ol.Attribution({html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' + 'rest/services/World_Imagery/MapServer">ArcGIS</a>'})],
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Imagery/MapServer/tile/{z}/{y}/{x}',
        }), name: 'Imagerie ESRI'
    });
    EsriImagery.setVisible(false);

    var OSM = new ol.layer.Tile({
            source: new ol.source.OSM(),
        }
    );
    OSM.setVisible(true);

    var Groupe_OpenData = new ol.layer.Group({layers: [OSM], name: 'CouchefondOpen'});
    var Groupe_Basemap = new ol.layer.Group({layers: [ImageryMapbox, EsriTopo, EsriImagery], name: 'Couchefond'});


    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh1_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille20/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh1_20.setVisible(true);

    var iqh1_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille50/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh1_50.setVisible(true);

    var iqh1_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille250/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh1_250.setVisible(true);

    var iqh1_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh3', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh1_WMS.setVisible(true);

    var Groupe_IQH1 = new ol.layer.Group({layers: [iqh1_20, iqh1_50, iqh1_250, iqh1_WMS], name: 'iqh1'});
    Groupe_IQH1.setVisible(false);


    var iqh2_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille20/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh2_20.setVisible(true);

    var iqh2_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille50/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh2_50.setVisible(true);

    var iqh2_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille250/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh2_250.setVisible(true);


    var iqh2_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh8', VERSION: '1.1.1'},
        }),
        maxResolution: 200,
    });
    iqh2_WMS.setVisible(true);

    var Groupe_IQH2 = new ol.layer.Group({layers: [iqh2_20, iqh2_50, iqh2_250, iqh2_WMS], name: 'iqh2'});
    Groupe_IQH2.setVisible(false);


//CHANTERELLE TUBE///////////////////////
    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh3_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille20/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh3_20.setVisible(true);

    var iqh3_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille50/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh3_50.setVisible(true);

    var iqh3_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh3/grille250/iqh3.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh3_250.setVisible(true);

    var iqh3_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh3', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh3_WMS.setVisible(true);

    var Groupe_IQH3 = new ol.layer.Group({layers: [iqh3_20, iqh3_50, iqh3_250, iqh3_WMS], name: 'iqh3'});
    Groupe_IQH3.setVisible(false);

//FIN CHANTERELLE TUBE

//PIED-DE-MOUTON///////////////////////
    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh4_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh5/grille20/iqh5.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh4_20.setVisible(true);

    var iqh4_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh5/grille50/iqh5.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh4_50.setVisible(true);

    var iqh4_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh5/grille250/iqh5.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh4_250.setVisible(true);

    var iqh4_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh5', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh4_WMS.setVisible(true);

    var Groupe_IQH4 = new ol.layer.Group({layers: [iqh4_20, iqh4_50, iqh4_250, iqh4_WMS], name: 'iqh4'});
    Groupe_IQH4.setVisible(false);

//FIN PIED-DE-MOUTON

//CHANTERELLE COMMUNE///////////////////////
    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh5_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh6/grille20/iqh6.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh5_20.setVisible(true);

    var iqh5_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh6/grille50/iqh6.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh5_50.setVisible(true);

    var iqh5_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh6/grille250/iqh6.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh5_250.setVisible(true);

    var iqh5_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh6', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh5_WMS.setVisible(true);

    var Groupe_IQH5 = new ol.layer.Group({layers: [iqh5_20, iqh5_50, iqh5_250, iqh5_WMS], name: 'iqh5'});
    Groupe_IQH5.setVisible(false);

//FIN CHANTERELLE COMMUNE

//HYDNE OMBILIQUÉ///////////////////////
    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh6_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille20/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh6_20.setVisible(true);

    var iqh6_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille50/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh6_50.setVisible(true);

    var iqh6_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh8/grille250/iqh8.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh6_250.setVisible(true);

    var iqh6_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh8', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh6_WMS.setVisible(true);

    var Groupe_IQH6 = new ol.layer.Group({layers: [iqh6_20, iqh6_50, iqh6_250, iqh6_WMS], name: 'iqh6'});
    Groupe_IQH6.setVisible(false);

//FIN HYDNE OMBILIQUÉ

//MATSUTAKE///////////////////////
    /** Définition des couches PFNL (overlay)  - Exemple de 2 groupes IQH sur plusieurs échelles : Groupe_IQH1 et Groupe_IQH2 **/
    var iqh7_20 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh12/grille20/iqh12.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 20",
        minResolution: 100,
        maxResolution: 1000,
        style: setGridFeatureStyle
    });
    iqh7_20.setVisible(true);

    var iqh7_50 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh12/grille50/iqh12.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 50",
        minResolution: 1000,
        maxResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh7_50.setVisible(true);

    var iqh7_250 = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            url: "http://igeomedia.com/~odupras/data/iqh/iqh12/grille250/iqh12.geojson",
            projection: 'EPSG:3857'
        }),
        title: "IQH Grille 250",
        minResolution: 2000,
        style: setGridFeatureStyle
    });
    iqh7_250.setVisible(true);

    var iqh7_WMS = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/iqh.map&',
            params: {LAYERS: 'iqh12', VERSION: '1.1.1'}
        }),
        maxResolution: 200,
    });
    iqh7_WMS.setVisible(true);

    var Groupe_IQH7 = new ol.layer.Group({layers: [iqh7_20, iqh7_50, iqh7_250, iqh7_WMS], name: 'iqh7'});
    Groupe_IQH7.setVisible(false);

//FIN MATSUTAKE


    /** Définition des couches Service (overlay)  - Groupe_Meteo qui contient les couches du service WMS  http://geo.weather.gc.ca/geomet/ **/
    var precipitation_6h = new ol.layer.Tile({
        name: 'Precipitation 6h',
        source: new ol.source.TileWMS({
            url: 'http://geo.weather.gc.ca/geomet/',
            params: {'LAYERS': 'RDPA.6P_PR', 'TILED': true},
        })
    });
    precipitation_6h.setVisible(false);

    var radar_rain = new ol.layer.Tile({
        name: 'Radar/rain',
        source: new ol.source.TileWMS({
            url: 'http://geo.weather.gc.ca/geomet/',
            params: {'LAYERS': 'RADAR_RRAI', 'TILED': true},
        })
    });
    radar_rain.setVisible(false);

    var temperature = new ol.layer.Tile({
        name: 'Temperature',
        source: new ol.source.TileWMS({
            url: 'http://geo.weather.gc.ca/geomet/',
            params: {'LAYERS': 'HRDPS.CONTINENTAL_TT', 'TILED': true},
        })
    });
    temperature.setVisible(false);
    temperature.setOpacity(0.7);

    var Groupe_Meteo = new ol.layer.Group({layers: [precipitation_6h, radar_rain, temperature], name: 'Couche meteo'});
    Groupe_Meteo.setVisible(false);


    /** Définition des couches Service (overlay)  - Groupe_Topo qui contient les couches du service WMS  http://ows.geobase.ca/wms/geobase_fr et fichiers AQR+**/
    var hydro = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://maps.geogratis.gc.ca/wms/canvec_fr',
            params: {LAYERS: 'hydro', VERSION: '1.3.0'}
        })
    });
    hydro.setVisible(false);

    var route = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://maps.geogratis.gc.ca/wms/canvec_fr',
            params: {LAYERS: 'transport', VERSION: '1.3.0'}
        })
    });
    route.setVisible(false);

    var chemin = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/odupras/public_html/data/aqrplus.map&',
            params: {LAYERS: 'che_for_01', VERSION: '1.1.1'}
        })
    });
    chemin.setVisible(false);

    var Groupe_Topo = new ol.layer.Group({layers: [hydro, route, chemin], name: 'Couche topo'});
    Groupe_Topo.setVisible(false);

    /** Définition de l'étendue géographique pour carte **/
    var view = new ol.View({
        center: ol.proj.transform([lonCenter, latCenter], 'EPSG:4326', 'EPSG:3857'),
        projection: ol.proj.get('EPSG:3857'),
        zoom: zoomCenter
    });


    /** Création de la Carte **/
    var map = new ol.Map({
        target: 'map',
        renderer: 'canvas',
        layers: [Groupe_OpenData, Groupe_Basemap, Groupe_IQH1, Groupe_IQH2, Groupe_IQH3, Groupe_IQH4, Groupe_IQH5, Groupe_IQH6, Groupe_IQH7, Groupe_Meteo, Groupe_Topo],
        view: view,
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
    });

    /* Création du style pour la grille */
    function setGridFeatureStyle(feature, resolution) {
        var style;
        var production = feature.get('Production');

        if (production == 0 || production <= 20) {
            style = new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba( 254, 229, 217, 0.5 )'}),
                stroke: new ol.style.Stroke({color: 'rgba( 0, 0, 0, 0.1 )'})
            });
        } else if (production > 20 || production <= 40) {
            style = new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba( 252, 174, 145, 0.5 )'}),
                stroke: new ol.style.Stroke({color: 'rgba( 0, 0, 0, 0.1 )'})
            });
        } else if (production > 40 || production <= 60) {
            style = new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba( 251, 106, 74, 0.5 )'}),
                stroke: new ol.style.Stroke({color: 'rgba( 0, 0, 0, 0.1 )'})
            });
        } else if (production > 60 || production <= 80) {
            style = new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba( 222, 45, 38, 0.5 )'}),
                stroke: new ol.style.Stroke({color: 'rgba( 0, 0, 0, 0.1 )'})
            });
        } else if (production > 80 || production <= 100) {
            style = new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba( 165, 15, 21, 0.5 )'}),
                stroke: new ol.style.Stroke({color: 'rgba( 0, 0, 0, 0.1 )'})
            });
        }

        return [style];
    }

    /** setGridFeatureStyle() */

