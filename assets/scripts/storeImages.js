function storeImage(image, filename){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    var dbVersion = 1.0;
    var db;
    var request  = indexedDB.open('inspectionImage', dbVersion);

    var createObjectStore = function (database){
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
    }
}