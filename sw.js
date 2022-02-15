const CACHE_ELEMENTOS = ["./", 
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "./style.css",
    "./components/Contador.js"
];

const CACHE_NAME = "v2_cache_contador_react";


self.addEventListener("install", (evento) =>{
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(CACHE_ELEMENTOS)
                    .then(() => {
                        self.skipWaiting()
                    })
                    .catch(console.log)
            })
    )
});


self.addEventListener("activate", (evento) => {
    const cacheWhitelist = [CACHE_NAME];

    evento.waitUntil(
        caches.keys().then((cacheNames) => { 
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return(
                cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
                );
            })
            );
        }).then(() => self.clients.chaim())
    );
});


self.addEventListener("fetch", (evento) => {
    evento.respondWith(() =>{
        caches.match(evento.request).then((respuesta) => (respuesta ? respuesta : fetch(evento.request)));
    });
});