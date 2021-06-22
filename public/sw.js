self.addEventListener("install", () => {
    self.skipWaiting(); // Update directly sw without delay
});

self.addEventListener("push", (event) => {
    let data = {
        title: 'Empty notification',
        message: 'new empty notification receive'
    };

    // eslint-disable-next-line no-prototype-builtins
    if ( event.hasOwnProperty('data') && event.data && Object.keys(event.data).length > 0 ) { // notification has data
        console.log('Notification data parsed !');
        data = event.data.json();
    }

    event.waitUntil(self.registration.showNotification(data.title, {
        body: data.message,
        data
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(openUrl("http://grafikart.fr"));
});

/**
 * Ouvre l'url ou focus la page qui est déjà ouverte sur cette URL
 * @param {string} url
 **/
async function openUrl(url) {
    const windowClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
    });
    for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && "focus" in client) {
            return client.focus();
        }
    }
    if (self.clients.openWindow) {
        return self.clients.openWindow(url);
    }
    return null;
}
