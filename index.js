document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({}, function (tabs) { 
      const tabsList = document.getElementById("tabs-list");
  
      tabs.forEach(function (tab) {

        const tabDiv = document.createElement("div");
        tabDiv.className="box";
        const muteKey = `mute-state-${tab.id}`;
        let isMuted = false;
  
        function updateMuteButton() {
          const muteButton = document.createElement("button");
          muteButton.id="button";
          muteButton.innerText = isMuted ? "Ses Ac" : "Ses Kapat";
  
          tabDiv.innerHTML = `
            <strong class="box">${tab.title}</strong>
          `;
          
          tabDiv.appendChild(muteButton);
          tabsList.appendChild(tabDiv);
  
          muteButton.addEventListener("click", function () {
            isMuted = !isMuted;
            chrome.storage.local.set({ [muteKey]: isMuted });
            muteButton.innerText = isMuted ? "Ses Ac" : "Ses Kapat";
            chrome.tabs.update(tab.id, { muted: isMuted });
          });

        }
  
        chrome.storage.local.get(muteKey, function (result) {
          if (result[muteKey] !== undefined) {
            isMuted = result[muteKey];
          }
  
          updateMuteButton();
        });
      });
    });
  });