function displayImage(filename, element, imgBlobObj){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    var dbVersion = 1.0;
    var db;
    var request  = indexedDB.open('inspectionImage', dbVersion);

    var createObjectStore = function (dataBase){
        console.log("creating ObjectStore");
        dataBase.createObjectStore("pictures");
    }

    request.onupgradeneeded = event =>{
        createObjectStore(event.target.result);
    }

    request.onerror = event =>{
        console.log('Error creating / accessing indexedDB database');
    }

    request.onsuccess = event => {
        console.log('Success creating / accessing indexedDB database');

        db = request.result;
        db.onerror = event =>{
            console.log('Error creating / accessing objectstore');
        }

        displayThumb();
    };

   

    var displayThumb = function(){
            console.log("putting picture in IndexDB");

            var transaction = db.transaction(['pictures'], "readonly");

            var objectStore = transaction.objectStore("pictures");

            var objectStoreRequest = objectStore.get(filename);

            objectStoreRequest.onsuccess = function(event){
                console.log("looking for " + filename);
                var imgFile = objectStoreRequest.result;
                console.log("got picture " + imgFile);

                imgBlobObj[element] = imgFile;
                imgBlobObj[element].name = filename;
                var imgURL = window.URL.createObjectURL(imgFile);
                var imgPicture = document.getElementById("places_picture");
                imgPicture.setAttribute("src", imgURL);
            }
        }

        var options = {name: imgBlobObj, type: "file", value: imgBlobObj[imgBlobObj]}
        console.log(options);
}