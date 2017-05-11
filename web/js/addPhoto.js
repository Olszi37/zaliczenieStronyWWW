/**
 * Created by MOlszi on 2017-05-10.
 */

$(document).ready( function () {

    imageDropZone.ondragover = function () {
        this.className = "hover";
        return false;
    }

    imageDropZone.ondragend = function () {
        this.className = "dropped";
        return false;
    }

    imageDropZone.ondrop = function (e) {
        this.className = "dropped";
        e.preventDefault();
        previewfile(e.dataTransfer.files[0]);
    }

    function previewfile(file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var image = new Image();
            //var htmlImage = $("#image");
            image.src = event.target.result;
            imageFile = event.target.result;
            image.width = 300; // a fake resize
            imageDropZone.appendChild(image);
        };

        reader.readAsDataURL(file);
    }
})

var imageFile;

function saveImage(){
    var db = getDatabase();

    var userId = sessionStorage.getItem("user_id");
    var title = $("#title").val();
    var description = $("#description").val();

    if(imageFile){
        db.transaction( function (tx) {
            tx.executeSql("INSERT INTO zdjecia (uzytkownik_id, zdjecie, opis, tytul) VALUES (?, ?, ?, ?)", [1, imageFile, description, title],
                function () {
                    console.log("zdjecie dodane");
                    window.location.href = "photoPage.html";
                },
                function (tx, error) {
                    console.log(error.message)
                })
        })
    } else {
        console.log("imageFile == null")
    }

}