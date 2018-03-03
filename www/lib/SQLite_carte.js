

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

//Cordova ready
function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(creationTableCarte, errorCB, getCarteNonSync);
}


//Création de la table constats
function creationTableCarte(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS carteHorsLigne (carte_id INTEGER PRIMARY KEY AUTOINCREMENT, extent_c, zoom_c, centre_c, path_c, taille_c, nom_c, espece_c)');
}


//Callback d'erreur générique
function errorCB(something) {
    alert('erreur DB')
    if (typeof something == 'object') {
        something = JSON.stringify(something);
    }
    console.log(something);
}

// Lancer la requête de sélection de tous dans la table demo
function getCarteNonSync() {
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM carteHorsLigne',[], afficherTableConstats);
    }, function(){alert('connection select all')});
}



//Création de la table demo pour visualisation dans l'application
function afficherTableConstats(tx, results) {
    var table01 = $('#tbl tbody');
    table01.html('');
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        table01.append(
            '<tr>'
            + '<td data-title="carte_id" data-desc="carte_id">'+results.rows.item(i).carte_id +'</td>'
            + '<td data-title="extent" data-desc="extent_c">'+results.rows.item(i).extent_c +'</td>'
            + '<td data-title="zoom" data-desc="zoom_c">'+results.rows.item(i).zoom_c +'</td>'
            + '<td data-title="centre" data-desc="centre_c">'+results.rows.item(i).centre_c +'</td>'
            + '<td data-title="path" data-desc="path_c">'+results.rows.item(i).path_c +'</td>'
            + '<td data-title="taille" data-desc="taille_c">'+results.rows.item(i).taille_c +'</td>'
            + '<td data-title="nom" data-desc="nom_c">'+results.rows.item(i).nom_c +'</td>'
            + '<td data-title="espece" data-desc="espece_c">'+results.rows.item(i).espece_c +'</td>'+
            '</tr>'
        );
    }
}



function insertCarte(empriseCarte,zoomCarte,centreCarte,pathCarte){
    var taille = 'a';
    var nom = 'a';
    var espece = 'a';
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('INSERT OR REPLACE INTO carteHorsLigne (extent_c, zoom_c, centre_c, path_c, taille_c, nom_c, espece_c) VALUES ("'+empriseCarte+'","'+zoomCarte+'","'+centreCarte+'","'+pathCarte+'","'+taille+'","'+nom+'","'+espece+'")',[],getCarteNonSync()); }
    ,function(error){alert(error.message)});
}



function dropTable (){
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('DROP TABLE IF EXISTS carteHorsLigne', [], onDeviceReady());

    }, errorCB);
}