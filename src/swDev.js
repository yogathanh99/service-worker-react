import { generateVAPIDKeys } from 'web-push';

export default function swDev() {
  // it contains public and private Vapid Key
  const vapidKeys = generateVAPIDKeys();

  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.log('Service Worker is registered');

    return res.pushManager.getSubscription().then(() => {
      res.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKeys.publicKey,
      });
    });
  });
}
