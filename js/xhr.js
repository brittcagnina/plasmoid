function xhrGet(reqUri) {
	var xhr = new XMLHttpRequest();
        var data;
	xhr.open("GET", reqUri, false);
	xhr.onload = function() {
            data = xhr.responseText;
        };
	xhr.send();
        return data;
}