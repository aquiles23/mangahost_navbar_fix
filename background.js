let extensionEnabled = false;

// Listen for changes to toggle/checkbox and send out extensionEnable
// to popup.js and remclass.js
chrome.extension.onMessage.addListener(function (
	request,
	sender,
	sendResponse
) {
	if (request.type === 'toggleOn') {
		extensionEnabled = true;
	}
	if (request.type === 'toggleOff') {
		extensionEnabled = false;
	}
	if (request.type === 'getToggleState') {
		sendResponse(extensionEnabled);
	}
});
