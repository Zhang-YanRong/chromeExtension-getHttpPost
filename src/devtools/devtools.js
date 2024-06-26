chrome.devtools.panels.create(
  "post",     // Panel title
  "",             // Path to an icon (optional)
  "src/panel/panel.html",   // Path to the panel's HTML
  function(panel) {
    panel.onShown.addListener(function (window) {
      const port = chrome.runtime.connect({ name: "devtools" });

      if (!window.listenerAdded) {
        window.listenerAdded = true;

        chrome.devtools.network.onRequestFinished.addListener(function(request) {
          if(request.request.method === 'POST'){
            let HttpData = {}

            HttpData.url = request.request.url

            
            let postJson = request.request.postData
        
            HttpData.req = postJson
            
            request.getContent(function(body) {
              let tempBody = JSON.parse(body)
              HttpData.res = tempBody

              port?.postMessage({ type: "http-request", data: HttpData });
            });
          }
        });

      }
    })

  }
);



