var CACHE_NAME = 'intelligent-inspections-cache-v1.0';

var urlsToCache = [
    '/',
    'assets/css/style.css',
    'assets/scripts/main.js',
    'assets/scripts/onlineDetection.js',
]


if('serviceWorker' in navigator ){
    navigator.serviceWorker.register('sw.js').then(function(registration){
        //registration was successfull
        console.log('serviceWorker registration successfull with scope:', registration.scope);
    }).catch(function(err){
        //registration failed
        console.log('serviceWorker registration failed: ', err);
    });

}

self.addEventListener('install', event => {
    console.log(event);
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response){
                    if(!response || response.status !== 200 || response.type !== 'basic'){
                        return response;
                    }

                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(function(cache){
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                }
            )
        })
    )
});
