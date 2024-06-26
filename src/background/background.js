let devtoolsPort;
let panelPort;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "devtools") {
    devtoolsPort = port;
    devtoolsPort.onMessage.addListener((msg) => {

      if (panelPort) {
        console.log('devtools', msg, panelPort)
        panelPort?.postMessage(msg);
      }
    });
  } else if (port.name === "panel") {
    console.log("panel")
    panelPort = port;
  } else {
    port.onMessage.addListener(function (message) {
      console.log("收到来自内容脚本的消息:", message);
      if (panelPort) {
        panelPort?.postMessage(message);
      }
    });
  }
});


