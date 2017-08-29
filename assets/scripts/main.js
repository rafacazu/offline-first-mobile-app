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

            //populate form

            fData = fData[0];

            console.log(fData);

            $.each(fData, function(formEle, formEleVal){
                if($('input[name='+formEle+']').is(':file ')){
                    console.log("display image");
                    displayImage(formEleVal, formEle);
                }
            })
        })
    })


    $('input[type=file]').on('change', function(){
        var tmppath = window.URL.createObjectURL(this.files[0]);
        console.log('temp path:' + tmppath);
        var filename = this.files[0].name;
        console.log('filename:' + filename);

        var filekey = this.name;
        console.log('file key:' + filekey);

        db.inspections.toArray().then(function(fData){
            fData = fData[fData.length - 1];
            formObj[filekey] = filename;
            db.inspections.update(fData.id, formObj);

            $("#"+ filekey ).attr('src', tmppath);
            storeImage(tmppath, filename);
        })
    })
});