$(document).ready(function(){
    console.log('main.js');



    var formObj = {}

    var db = new Dexie('intelligenteInspections');
    db.version(1).stores({
        inspections: '++id'
    });

    db.open().then(function(){
        db.inspections.toArray().then(function(fData){
            if(fData.length === 0){
                db.inspections.put(formObj);
                console.log("inserted blank record")
            }
        })

    })
});