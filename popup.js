document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("pipButton");
  const closeButton = document.getElementById("pipCloseButton");
  const messageDiv = document.getElementById("message");

  // Metinleri manuel olarak ayarla
  document.getElementById("popupTitle").textContent = chrome.i18n.getMessage("popup_title");
  document.getElementById("headerTitle").textContent = chrome.i18n.getMessage("popup_title");
  document.getElementById("pipOpenText").textContent = chrome.i18n.getMessage("pip_open_button");
  document.getElementById("pipCloseText").textContent = chrome.i18n.getMessage("pip_close_button");
  document.getElementById("infoText").textContent = chrome.i18n.getMessage("info_text");

  // i18n sisteminin çalıştığını kontrol et
  console.log("Tarayıcı dili:", chrome.i18n.getUILanguage());
  console.log("Popup başlığı:", chrome.i18n.getMessage("popup_title"));
  console.log("PIP aç metni:", chrome.i18n.getMessage("pip_open_button"));
  console.log("PIP kapat metni:", chrome.i18n.getMessage("pip_close_button"));
  console.log("Bilgi metni:", chrome.i18n.getMessage("info_text"));

  // PiP durumunu kontrol et ve düğmeleri güncelle
  function updateButtonVisibility() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        messageDiv.textContent = chrome.i18n.getMessage("msg_no_active_tab");
        messageDiv.classList.add("show");
        console.error("Aktif sekme bulunamadı.");
        return;
      }

      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { action: "checkPiPStatus" }, (response) => {
        if (chrome.runtime.lastError) {
          messageDiv.textContent = chrome.i18n.getMessage("msg_communication_error", chrome.runtime.lastError.message);
          messageDiv.classList.add("show");
          console.error("Mesaj gönderme hatası:", chrome.runtime.lastError.message);
          return;
        }
        if (response && response.isPiPActive) {
          openButton.style.display = "none";
          closeButton.style.display = "block";
        } else {
          openButton.style.display = "block";
          closeButton.style.display = "none";
        }
      });
    });
  }

  // PiP Aç düğmesi
  openButton.addEventListener("click", () => {
    messageDiv.textContent = chrome.i18n.getMessage("msg_pip_starting");
    messageDiv.classList.add("show");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        messageDiv.textContent = chrome.i18n.getMessage("msg_no_active_tab");
        messageDiv.classList.add("show");
        console.error("Aktif sekme bulunamadı.");
        return;
      }

      const tab = tabs[0];
      console.log("Aktif sekme:", tab.url);

      if (tab.url.startsWith("chrome://") || tab.url.startsWith("file://") || tab.url.startsWith("about:")) {
        messageDiv.textContent = chrome.i18n.getMessage("msg_unsupported_url");
        messageDiv.classList.add("show");
        console.error("Desteklenmeyen sekme URL’si:", tab.url);
        return;
      }

      // Content script’e PiP düğmesini tetikleme mesajı gönder
      chrome.tabs.sendMessage(tab.id, { action: "triggerPiP" }, (response) => {
        if (chrome.runtime.lastError) {
          messageDiv.textContent = chrome.i18n.getMessage("msg_communication_error", chrome.runtime.lastError.message);
          messageDiv.classList.add("show");
          console.error("Mesaj gönderme hatası:", chrome.runtime.lastError.message);
          // Content script’i manuel olarak enjekte et
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          }, () => {
            if (chrome.runtime.lastError) {
              messageDiv.textContent = chrome.i18n.getMessage("msg_script_injection_error", chrome.runtime.lastError.message);
              messageDiv.classList.add("show");
              console.error("Script enjeksiyon hatası:", chrome.runtime.lastError.message);
              return;
            }
            // Tekrar PiP isteği gönder
            chrome.tabs.sendMessage(tab.id, { action: "triggerPiP" }, (response) => {
              if (chrome.runtime.lastError) {
                messageDiv.textContent = chrome.i18n.getMessage("msg_communication_error", chrome.runtime.lastError.message);
                messageDiv.classList.add("show");
                console.error("Mesaj gönderme hatası:", chrome.runtime.lastError.message);
                return;
              }
              if (response && response.success) {
                messageDiv.textContent = chrome.i18n.getMessage("msg_pip_started");
                messageDiv.classList.add("show");
                updateButtonVisibility();
              } else {
                messageDiv.textContent = response?.message || chrome.i18n.getMessage("msg_no_video");
                messageDiv.classList.add("show");
              }
            });
          });
          return;
        }
        if (response && response.success) {
          messageDiv.textContent = chrome.i18n.getMessage("msg_pip_started");
          messageDiv.classList.add("show");
          updateButtonVisibility();
        } else {
          messageDiv.textContent = response?.message || chrome.i18n.getMessage("msg_no_video");
          messageDiv.classList.add("show");
        }
      });
    });
  });

  // PiP Kapat düğmesi
  closeButton.addEventListener("click", () => {
    messageDiv.textContent = chrome.i18n.getMessage("msg_pip_closing");
    messageDiv.classList.add("show");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        messageDiv.textContent = chrome.i18n.getMessage("msg_no_active_tab");
        messageDiv.classList.add("show");
        console.error("Aktif sekme bulunamadı.");
        return;
      }

      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { action: "closePiP" }, (response) => {
        if (chrome.runtime.lastError) {
          messageDiv.textContent = chrome.i18n.getMessage("msg_communication_error", chrome.runtime.lastError.message);
          messageDiv.classList.add("show");
          console.error("Mesaj gönderme hatası:", chrome.runtime.lastError.message);
          return;
        }
        if (response && response.success) {
          messageDiv.textContent = chrome.i18n.getMessage("msg_pip_closed");
          messageDiv.classList.add("show");
          updateButtonVisibility();
        } else {
          messageDiv.textContent = response?.message || chrome.i18n.getMessage("msg_pip_close_error");
          messageDiv.classList.add("show");
        }
      });
    });
  });

  // Başlangıçta düğme görünürlüğünü güncelle
  updateButtonVisibility();
});