let extensionEnabled = false;
const toggleElem = document.getElementById('toggle');
const refreshButtonElm = document.querySelector('.modal');

// Get the current state of the toggle from the background page
chrome.extension.sendMessage({ type: 'getToggleState' }, function (response) {
	extensionEnabled = response;
	// Match the state of the input/checkbox with the state in the extensionEnabled var
	toggleElem.checked = extensionEnabled;
});

// Refresh page after toggle changes state; requires tab permissions to use url
refreshButtonElm.addEventListener('click', function () {
	console.log('Clicked refresh button');
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.reload(tabs[0].id);
	});
});

// On checkbox change update the background page variable
toggleElem.addEventListener('change', function () {
	console.log(toggleElem.checked);
	//Show the refresh button if they interacted with the toggle
	refreshButtonElm.style.display = 'initial';
	chrome.extension.sendMessage({
		type: toggleElem.checked ? 'toggleOn' : 'toggleOff'
	});
});
