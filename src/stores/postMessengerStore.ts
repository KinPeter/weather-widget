import { defineStore } from 'pinia';
import { useApiKeysStore } from './apiKeysStore.ts';
import { ref } from 'vue';

function isSafeOrigin(url: string): boolean {
  const localUrl = /^http:\/\/localhost:\d{4}$/;
  const prodUrl = /^https:\/\/[a-zA-Z0-9]{3,10}\.p-kin\.com$/;

  const isLocal = localUrl.test(window.location.origin);
  return isLocal ? localUrl.test(url) : prodUrl.test(url);
}

const START_CONTEXT = 'START_V4';

export const usePostMessengerStore = defineStore('postMessenger', () => {
  const { setApiKeys, updateIfNotFramed } = useApiKeysStore();
  const isFramed = ref(false);

  if (window.self === window.top) {
    console.log('[WEATHER] Not in an iframe, exiting PostMessengerStore');
    updateIfNotFramed();
    return { sendMessageToHost };
  }

  isFramed.value = true;
  console.log('[WEATHER] PostMessengerStore is UP');
  sendMessageToHost('weather.handshake');

  window.addEventListener('message', event => {
    if (
      event.origin === window.location.origin ||
      !isSafeOrigin(event.origin) ||
      event.data.context !== START_CONTEXT
    ) {
      return;
    }
    console.log('[WEATHER] Received message:', event.data.topic, event);

    switch (event.data.topic) {
      case 'weather.apiKeys':
        handleApiKeys(event.data.payload);
        break;
      case 'weather.reload':
        window.location.reload();
        break;
    }
  });

  function sendMessageToHost(topic: string, payload?: unknown): void {
    if (!isFramed.value) {
      return;
    }
    window.parent.postMessage(
      {
        context: START_CONTEXT,
        topic,
        payload,
      },
      '*'
    );
  }

  function handleApiKeys({
    weatherApiKey,
    locationApiKey,
  }: {
    weatherApiKey: string;
    locationApiKey: string;
  }) {
    console.log('[WEATHER] Received api keys:', locationApiKey, weatherApiKey);
    setApiKeys(weatherApiKey, locationApiKey);
    sendMessageToHost('weather.infoNotification', 'Weather widget setup successful.');
  }

  return { sendMessageToHost };
});
