import { createApp } from 'vue';
import ShowContent from '../components/ShowContent.vue'
import {on, off, publish} from '../utils/PubSub.js'
import JsonViewer from 'vue-json-viewer'

const app = createApp(ShowContent);
app.use(JsonViewer)
app.mount('#app');



document.addEventListener('DOMContentLoaded', function () {
  const port = chrome.runtime.connect({ name: "panel" });
  // 监听来自 background.js 的消息，只注册一次监听器
  if (!port.hasListeners) {
    port.onMessage.addListener((message) => {
      if (message.type === "http-request") {
        publish('httpRequest', message)
      }
    });
    port.hasListeners = true; // 设置标志位，表示已经注册了监听器
  }
})
