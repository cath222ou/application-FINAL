var empriseCarte;
var zoomCarte;
var centreCarte;
var pathCarte;


$("#download").click(function() {



        map.once('postcompose', function(event) {
            var canvas = event.context.canvas;
            var quality = 1 ;// 0 to 1
            var folderpath = cordova.file.applicationStorageDirectory;
            var filename = 'carte1.png';

            canvas.toBlob(function(blob){
              //  console.log(blob.toDataURL())
                savebase64AsImageFile(folderpath,filename,blob);
              }, 'image/png', quality);

            empriseCarte = map.getView().calculateExtent(map.getSize());
            zoomCarte = map.getView().getZoom();
            centreCarte = map.getView().getCenter();
            pathCarte = folderpath + filename;

            insertCarte(empriseCarte,zoomCarte,centreCarte,pathCarte);

        });
        map.renderSync();
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


//Pour supprimer les cartes hors ligne dans la mémoire interne du mobile
function supprimerCarte(){
    path = 'file:///data/user/0/com.adobe.phonegap.app/';
    filename = 'carte1.png';
    window.resolveLocalFileSystemURL(path, function(dir) {
        dir.getFile(filename, {create:false}, function(fileEntry) {
            fileEntry.remove(function(){
                alert('fichier supprimé')
            },function(error){
                alert('Erreur de supression')
            },function(){
                alert('le fichier nexiste pas')
            });
        });
    });
}