function storeImage(image, filename, imgBlobObj, element){
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

        getImageFile();
    };

    var getImageFile = function(){
        var xhr = new XMLHttpRequest();
        var blob;

        xhr.open("GET", image, true);
        xhr.responseType = "blob";

        xhr.addEventListener("load", function(){
            if(xhr.status === 200){
                console.log("image retrivied");
                blob = xhr.response;
                console.log("Blob:" + blob);
                putImageInDb(blob);
            }
        });

        xhr.send();
    }

    var putImageInDb = function(blob){
            console.log("putting picture in IndexDB");

            var transaction = db.transaction(['pictures'], "readwrite");

            var put = transaction.objectStore("pictures").put(blob, filename);

              imgBlobObj[element] = blob;
            imgBlobObj[element].name = filename;
        }
}