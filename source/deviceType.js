function findDevice(){
	var uagent = navigator.userAgent.toLowerCase();
	console.error(uagent);
	var checkIOS = ["iphone","ipod","ipad"/*"safari"*/];
	var checkAndroid = ["android"];
	var checkWebOS = ["hpwos","webos"];
	for(x in checkIOS){
		if(uagent.search(checkIOS[x]) > -1){return "iOS"}
	}
	for(x in checkAndroid){
		if(uagent.search(checkAndroid[x]) > -1){return "Android"}
	}
	for(x in checkWebOS){
		if(uagent.search(checkWebOS[x]) > -1){return "webOS"}
	}
	return "web";
}
deviceType = findDevice();
console.error(deviceType);