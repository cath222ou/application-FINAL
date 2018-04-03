// Wait for Cordova to load
    document.addEventListener("deviceready", onDeviceReady, false);


//Cordova ready
function onDeviceReady() {
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(creationTableCarte, errorCB, getCarteNonSync);
}

//Création de la table constats
function creationTableCarte(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS carteHorsLigne (carte_id INTEGER PRIMARY KEY AUTOINCREMENT, extent_c1, extent_c2, extent_c3, extent_c4, zoom_c, centre_c1, centre_c2, path_c, nom_c, espece_c)');
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
            + '<td data-title="carte_id" data-desc="carte_id" class="hidden">'+results.rows.item(i).carte_id +'</td>'
            + '<td data-title="extent" data-desc="extent_c" class="hidden">'+results.rows.item(i).extent_c1 +'</td>'
            + '<td data-title="zoom" data-desc="zoom_c" class="hidden">'+results.rows.item(i).zoom_c +'</td>'
            + '<td data-title="centre1" data-desc="centre_c1" class="hidden">'+results.rows.item(i).centre_c1 +'</td>'
            + '<td data-title="centre2" data-desc="centre_c2" class="hidden">'+results.rows.item(i).centre_c2 +'</td>'
            + '<td data-title="path" data-desc="path_c" class="hidden">'+results.rows.item(i).path_c +'</td>'
            + '<td data-title="Titre" data-desc="nom_c" style="font-size:20px;">'+results.rows.item(i).nom_c +'</td>'
            + '<td data-title="Espèce(s)" data-desc="espece_c" style="font-size:20px;">'+results.rows.item(i).espece_c +'</td>'
            + '<td><button id="ouvrirBtn" data-extent1="'+results.rows.item(i).extent_c1+'" data-extent2="'+results.rows.item(i).extent_c2+'"  data-extent3="'+results.rows.item(i).extent_c3+'"  data-extent4="'+results.rows.item(i).extent_c4+'" data-zoom="'+results.rows.item(i).zoom_c+'" data-centre1="'+results.rows.item(i).centre_c1+'" data-centre2="'+results.rows.item(i).centre_c2+'" data-path="'+results.rows.item(i).path_c+'" onclick="ouvrirCarte(this)" type="button" class="buttonRetour ui-button ui-widget ui-corner-all" style="color:white; font-size: 14px;">Ouvrir</button>'
            + '<button id="retour1" data-toggle="modal" data-target="#deleteModal" data-id="'+results.rows.item(i).carte_id+'" data-name="'+results.rows.item(i).nom_c+'" data-path="'+results.rows.item(i).path_c+'" class="buttonSupprimer ui-button ui-widget ui-corner-all"><i class="fa fa-trash fa-lg awesomeBtn"></i></button></td>'+
            '</tr>'
        );
    }
}

//Fonction pour aller rechercher les informations de la carte sélectionnée
function ouvrirCarte(value){
    extent1 = value.getAttribute('data-extent1');
    extent2 = value.getAttribute('data-extent2');
    extent3 = value.getAttribute('data-extent3');
    extent4 = value.getAttribute('data-extent4');
    zoom = value.getAttribute('data-zoom');
    centre1 = value.getAttribute('data-centre1');
    centre2 = value.getAttribute('data-centre2');
    path = value.getAttribute('data-path');
    //Gestion des pages (passer de mesCartes à mesCartesHorsLigne)
    $('#mesCartes').addClass('hidden');
    $('#mesCartesHorsligne').removeClass('hidden');
    //Lancer l'initialisation de la carte
    initializeMap(extent1,extent2,extent3,extent4, zoom, centre1, centre2, path)
}


//Fonction d'insertion de l'information de la carte lors de l'enregistrement
function insertCarte(empriseCarte,zoomCarte,centreCarte,pathCarte,nomCarte, espece){
    //a enleverr !!!
    //pathCarte='image/map_2.png';
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('INSERT OR REPLACE INTO carteHorsLigne (extent_c1,extent_c2,extent_c3,extent_c4, zoom_c, centre_c1, centre_c2, path_c, nom_c, espece_c) VALUES ("'+empriseCarte[0]+'","'+empriseCarte[1]+'","'+empriseCarte[2]+'","'+empriseCarte[3]+'","'+zoomCarte+'","'+centreCarte[0]+'","'+centreCarte[1]+'","'+pathCarte+'","'+nomCarte+'","'+espece+'")',[],getCarteNonSync()); }
    ,function(error){alert(error.message)});
}


//Fonction pour supprimer la table (Pour la programmation)
// function dropTable (){
//     db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
//     db.transaction(function(tx){
//         tx.executeSql('DROP TABLE IF EXISTS carteHorsLigne', [], onDeviceReady());
//
//     }, errorCB);
// }


$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var nomCarte = button.data('name'); // Extract info from data-* attributes
    $('#idCache').text(button.data('id'));
    $('#pathCache').text(button.data('path'));
    var modal = $(this);
    modal.find('.modal-title').text('Supression de la carte: ' + nomCarte);
    modal.find('.modal-body h5').text('La carte «'+nomCarte+'» sera définitivement supprimée de votre appareil mobile. Veuillez confirmer la suppression.');
});


//Pour supprimer les cartes hors ligne dans la mémoire interne du mobile
function supprimerCarte(){
    var idValue = $('#idCache').text();
    var pathValue = $('#pathCache').text();
    var path = pathValue.substr(0, pathValue.lastIndexOf("/")+1);
    var fileName = pathValue.substring(pathValue.lastIndexOf("/") + 1, pathValue.length);

    //path = 'file:///data/user/0/com.adobe.phonegap.app/';
    //filename = 'carte1.png';

    //Supprimer l'image sur l'appareil mobile
    window.resolveLocalFileSystemURL(path, function(dir) {
        dir.getFile(fileName, {create:false}, function(fileEntry) {
           fileEntry.remove(function(){
                alert('Le fichier a été supprimé avec succès');
               //Supprimer l'enregistrement correspondante dans la table
               db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
               db.transaction(function(tx){
                       tx.executeSql('DELETE FROM carteHorsLigne WHERE carte_id='+idValue,[],getCarteNonSync()); }
                   ,function(error){alert(error.message)});
            },function(error){
                alert('Erreur de supression')
            },function(){
                alert('Ce fichier n\'existe pas')
            });
        });
    });
    $('#deleteModal').modal('hide')
}