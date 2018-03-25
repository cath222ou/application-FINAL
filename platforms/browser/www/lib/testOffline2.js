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

function nomCarteListe(tx,results){
    var len = results.rows.length;
    for (var i=0; i<len; i++){
        listeNomCarte.push(results.rows.item(i).nom_c)
    }

}

function nomCarteListeSQL(){
    db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    db.transaction(function(tx){
        tx.executeSql('SELECT nom_c FROM carteHorsLigne',[], nomCarteListe);
    }, function(){alert('connection select all')});
}


//Enregistrement de la carte et de l'insertion des informations dans la table
$("#download").click(function() {

    //Remplace le nom de la carte pour s'assurer qu'il n'y a pas d'espace ou de caractères spéciaux
    //Les espaces sont remplacés par des _
    var regExpr = /[^a-zA-Z0-9-_]/g;
    var userText = $('#nomCarte').val();
    var nomSansEspace = userText.replace(regExpr, "");
    nomSansEspace = nomSansEspace.split(' ').join('_');

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
        $('#validation').text('Ce titre de carte existe déjà');
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
                    espece = espece + "," + $("#selectEspece2 option:selected").text();
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

/**
 * Create a Image file according to its database64 content only.
 *
 * @param folderpath {String} The folder where the file will be created
 * @param filename {String} The name of the file that will be created
 * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
 */
function savebase64AsImageFile(folderpath,filename,DataBlob){


    // Convert the base64 string in a Blob
    //var DataBlob = b64toBlob(content,contentType);

    console.log("Starting to write the file :3");

    window.resolveLocalFileSystemURL(folderpath, function(dir) {
        console.log("Access to the directory granted succesfully");
        dir.getFile(filename, {create:true}, function(file) {
            alert("La carte a été enregistrée averc succès");
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

