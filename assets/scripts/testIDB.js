if(!window.indexedDB){
    window.alert("Your browser doesn't suppor indexedDB");
}

var db;
var request = window.indexedDB.open("MyFirsDatabase",11);

request.onupgradeneeded = function (event){
    console.log("running onupgradeneeded");
    var myDB = event.target.result;

    if(!myDB.objectStoreNames.contains("inspections")){
        myDB.createObjectStore("inspections");
    }
};

request.onerror = function(event){
    //do something
}

request.onsuccess = function(event){
    db = event.target.result;
    document.querySelector("#submitButton").addEventListener("click", addInspection);
};

function addInspection (event){
    var transaction = db.transaction(["inspections"], "readwrite");
    var store = transaction.objectStore("inspections");

    var inspection = {
        prop_id: "4",
        inspection_date: "November 3, 2016",
        int_walls: 5,
        int_walls_note: "Has some walls"
    };

    var request = store.add(inspection, 1);
    request.onerror = function(event){
        console.log("error:", event.target.error.name );
    };

    request.onsuccess = function(event){
        console.log("request completed");
    }
}