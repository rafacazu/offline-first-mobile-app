window.addEventListener('load', function(e){
    if(navigator.onLine){
        updateOnlineStatus(true);
    }else{
        updateOnlineStatus(false);
    }
});

window.addEventListener('online', function(e){
    updateOnlineStatus(true);
});

window.addEventListener('offline', function(e){
    updateOnlineStatus(false);
});

function updateOnlineStatus(online){
    var osm = document.getElementById('onlineStatusMessage');
    if(online){
        osm.innerHTML = 'online';
    }else{
        osm.innerHTML = 'offline';
    }
}