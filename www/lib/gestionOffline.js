var empriseCarte;
var zoomCarte;
var centreCarte;
var pathCarte;
var listeNomCarte = [];
var compte;


// Pour la gestion de l'ajout ou non du champ texte pour un nom d'espèce AUTTRE
$( "#selectEspece" ).on("change", function(){
    if ($("#selectEspece option:selected").text()=== 'Autre') {
        $('#autreEspece').removeClass('hidden');
    }
    else {
        $('#autreEspece').addClass('hidden');
    }
});
$( "#selectEspece2" ).on("change", function(){
    if ($("#selectEspece2 option:selected").text()=== 'Autre') {
        $('#autreEspece2').removeClass('hidden');
    }
    else {
        $('#autreEspece2').addClass('hidden');
    }
});

//Fonction pour vérifier que le nom de la carte n'est pas déjjà existante dans la BD
function nomCarteListe(tx,results){
    var len = results.rows.length;
    for (var i=0; i<len; i++){
        listeNomCarte.push(results.rows.item(i).nom_c)
    }

}

//Fonction pour vérifier que le nom de la carte n'est pas déjjà existante dans la BD
function nomCarteListeSQL(){
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT nom_c FROM carteHorsLigne',[], nomCarteListe);
    }, function(){alert('connection select all')});
}

//Cacher le message d'erreur en rouge lorsque la personne appuie sur le champs texte
$('#nomCarte').click(function(){
    $('#validation').addClass('hidden');
    $('#nomCarte').removeClass('invalid');
});


//Enregistrement de la carte et de l'insertion des informations dans la table
$("#download").click(function() {

    //Remplace le nom de la carte pour s'assurer qu'il n'y a pas d'espace ou de caractères spéciaux
    //Les espaces sont remplacés par des _
    var regExpr = /[^a-zA-Z0-9-_]/g;
    var userText = $('#nomCarte').val();
    var nomSansEspace = userText.replace(regExpr, "");
    nomSansEspace = nomSansEspace.split(' ').join('_');

    //Compte le nombre de fois que le titre est existant dans la BD
    //Pour vérifier que le titre de revienne pas deux fois
    var len = listeNomCarte.length;
    compte = 0;
    for (var i=0; i<len; i++){
        if (listeNomCarte[i] == userText){
            compte+=1;
        }
    }

    //Validation des champs remplies pour l'enregistrement de la carte
    //Vérifier si champs de titre est vide
    if ($('#nomCarte').val()=== ''){
        $('#validation').text('Veuillez entrer un titre à la carte');
        $('#validation').removeClass('hidden');
        $('#nomCarte').addClass('invalid');
    }
    //Vérifier si champs de titre existe déjà dans la mémoire interne
    else if(compte > 0){
        $('#validation').text('Ce titre existe déjà');
        $('#validation').removeClass('hidden');
        $('#nomCarte').addClass('invalid');
    }
    //Si non pour les deux autres, lancer l'enregistrement de la carte
    else{
        $('#validation').addClass('hidden');
        $('#nomCarte').removeClass('invalid');


        //Enregistrement de la carte à son état actuel
        map.once('postcompose', function (event) {
            var canvas = event.context.canvas;
            var quality = 1;// 0 to 1
            var folderpath = cordova.file.applicationStorageDirectory;
            var filename = nomSansEspace + '.png';
            var nomCarte = $('#nomCarte').val();
            var espece = '';


            //Enregistrer la carte comme image PNG
            canvas.toBlob(function (blob) {
                savebase64AsImageFile(folderpath, filename, blob);
            }, 'image/png', quality);


            empriseCarte = map.getView().calculateExtent(map.getSize());
            zoomCarte = map.getView().getZoom();
            centreCarte = map.getView().getCenter();
            pathCarte = folderpath + filename;


            //Si Autre espece est cocher, utiliser la valeur dans le champs ajouté
            if ($("#selectEspece option:selected").text() === 'Autre') {
                espece = $('#nomAutreEspece').val();
            }
            //Sinon prendre la valeur coché
            else {
                espece = $("#selectEspece option:selected").text();
            }
            //Vérifier si deuxième espece
            if ($("#selectEspece2 option:selected").text() !== 'Aucune') {
                if ($("#selectEspece2 option:selected").text() === 'Autre') {
                    espece = espece + "," + $('#nomAutreEspece2').val();
                }
                //Sinon prendre la valeur coché
                else {
                    espece = espece + ", " + $("#selectEspece2 option:selected").text();
                }
            }

            //Lancer la fonction d'insertion dans la table
            insertCarte(empriseCarte, zoomCarte, centreCarte, pathCarte, nomCarte, espece);

            //Vider le champs text du nom de la carte
            $('#nomCarte').val('');
            //Remettre la valeur Bleuet Sauvage comme valeur par défaut du select menu
            $("#selectEspece").val('Bleuet sauvage');
            //Remettre le champs texte du nom de l'Espèce caché et vide
            $('#autreEspece').addClass('hidden');
            $('#nomAutreEspece').val('');
            //Fermer le modal
            $('#carteModal').modal('hide');


        });
        map.renderSync();

    }
});


//Fonction pour transformer l'image encodé en image de format PNG
function savebase64AsImageFile(folderpath,filename,DataBlob){


    // Convert the base64 string in a Blob
    //var DataBlob = b64toBlob(content,contentType);

    console.log("Starting to write the file :3");

    window.resolveLocalFileSystemURL(folderpath, function(dir) {
        console.log("Access to the directory granted succesfully");
        dir.getFile(filename, {create:true}, function(file) {
            alert("La carte a été enregistrée avec succès");
            console.log("File created succesfully.");
            file.createWriter(function(fileWriter) {
                console.log("Writing content to file");
                fileWriter.write(DataBlob);
                console.log(folderpath)
            }, function(){
                alert('La carte n\'a pas été enregistrée');
            });
        });
    })
}

