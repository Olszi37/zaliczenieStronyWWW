/**
 * Created by MOlszi on 2017-05-10.
 */

$(document).ready( function () {

    var imageDropZone = $("#imageDropZone");
    
    imageDropZone.ondragover = function () {
        this.className = "hover";
        return false;
    }
    
    imageDropZone.ondrop = function (e) {
        this.className = "hidden";
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var image = $("#image")
            image.className = "visible";
            image.attr("src", event.target.result);
        }
        //reader.readAsDataURL(file);
    }
})