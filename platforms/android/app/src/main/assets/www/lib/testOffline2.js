var empriseCarte;
var zoomCarte;
var centreCarte;
var pathCarte;

// Pour la gestion de l'ajout ou non du champ texte pour un nom d'espèce AUTTRE
$( "#selectEspece" ).on("change", function(){
    if ($("#selectEspece option:selected").text()=== 'Autre') {
        $('#autreEspece').removeClass('hidden');
    }
    else {
        $('#autreEspece').addClass('hidden');
    }
});

//Enregistrement de la carte et de l'insertion des informations dans la table
$("#download").click(function() {


    if ($('#nomCarte').val()=== ''){
        $('#validation').removeClass('hidden');
        $('#nomCarte').addClass('invalid');
    }
    else {
        $('#validation').addClass('hidden');
        $('#nomCarte').removeClass('invalid');

        //Remplace le nom de la carte pour s'assurer qu'il n'y a pas d'espace ou de caractères spéciaux
        //Les espaces sont remplacés par des _
        var regExpr = /[^a-zA-Z0-9-_]/g;
        var userText = $('#nomCarte').val();
        var nomSansEspace = userText.replace(regExpr, "");
        nomSansEspace = nomSansEspace.split(' ').join('_');

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

            if ($("#selectEspece option:selected").text() === 'Autre') {
                espece = $('#nomAutreEspece').val();
            }
            else {
                espece = $("#selectEspece option:selected").text();
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
            alert("File created succesfully.");
            console.log("File created succesfully.");
            file.createWriter(function(fileWriter) {
                console.log("Writing content to file");
                fileWriter.write(DataBlob);
                alert(folderpath)
            }, function(){
                alert('Unable to save file in path '+ folderpath);
            });
        });
    })
}

