console.log("content.js yüklendi");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Mesaj alındı:", request);
  if (request.action === "triggerPiP") {
    const video = document.querySelector("video");
    if (!video) {
      sendResponse({ success: false, message: chrome.i18n.getMessage("msg_no_video") });
      return true;
    }

    if (!document.pictureInPictureElement) {
      video.requestPictureInPicture().then(() => {
        console.log("PiP başlatıldı.");
        sendResponse({ success: true, message: chrome.i18n.getMessage("msg_pip_started") });
      }).catch((err) => {
        console.error("PiP başlatma hatası:", err);
        sendResponse({ success: false, message: chrome.i18n.getMessage("msg_no_video") });
      });
    } else {
      sendResponse({ success: true, message: chrome.i18n.getMessage("msg_pip_already_active") });
    }
  } else if (request.action === "closePiP") {
    const video = document.querySelector("video");
    if (!video) {
      sendResponse({ success: false, message: chrome.i18n.getMessage("msg_no_video") });
      return true;
    }
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().then(() => {
        console.log("PiP modundan çıkıldı.");
        sendResponse({ success: true, message: chrome.i18n.getMessage("msg_pip_closed") });
      }).catch((err) => {
        console.error("PiP kapatma hatası:", err);
        sendResponse({ success: false, message: chrome.i18n.getMessage("msg_pip_close_error") });
      });
    } else {
      sendResponse({ success: false, message: chrome.i18n.getMessage("msg_pip_already_closed") });
    }
  } else if (request.action === "checkPiPStatus") {
    sendResponse({ isPiPActive: !!document.pictureInPictureElement });
  }
  return true;
});