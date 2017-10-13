/*
 *
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 *
 */

function OceanloungeAssistant() {
	log = "";
}


OceanloungeAssistant.prototype.activate = function(event) {
    this.resizee();
	currentScene = "ocean";
	document.getElementById("chatScroller").style.zIndex = 10;
	markAppForeground();
	document.getElementById("theChatText").addEventListener("change", this.handleInputSpecialKeys.bind(this));
	document.addEventListener(this.audioPlayer1, "ended", this.audioStopped1.bind(this), false);
	if(!villo.chat.isSubscribed("WildnPokerChat2")) {
		console.log("Entering Room: WildnPokerChat...");
		villo.chat.join({
			room : "WildnPokerChat2",
			callback : this.newMessage.bind(this)
		});
		if(villo.chat.isSubscribed("WildnPokerChat2")) {
			console.log("SUCCESS!");
			villo.chat.send({
				room : "WildnPokerChat2",
				message : "#user has entered the room."
			});
		} else {
			console.log("Failed.");
		}
	}
	oceanScroller.revealBottom();
	oceanScroller.refresh();
	document.getElementById("theChatText").onmousedown = function(event){
		if(this.focused){oceanScroller.revealBottom();}
		return true;
	}
	document.getElementById("theChatText").onfocus = function(event){
		this.focused = true;
		return true;
	}
	document.getElementById("theChatText").onblur = function(event){
		this.focused = false;
		return true;
	}
};
OceanloungeAssistant.prototype.deactivate = function(event) {
	//villo.chat.closeAllConnections();
	document.getElementById("chatScroller").style.zIndex = -1;
	document.removeEventListener(this.audioPlayer1, "ended", this.audioStopped1.bind(this), false);
};
OceanloungeAssistant.prototype.cleanup = function(event) {
	//villo.chat.closeConnection({
	//room : "WildnPokerChat2"
	//});
	isOceanChatOpen = false;
	checkVilloStatus();
};
OceanloungeAssistant.prototype.resizee = function(event) {
	var resizeThis = scaleFactor;
	var verticalShift = 0;
	if(doScale && !verticalMargin) {
		verticalShift = 30 / resizeThis;
	}
	var heightChange = (480 / resizeThis - window.innerHeight);
	var chatScrollerHeight = 363 / resizeThis - heightChange;
	document.getElementById("chatScroller").style.height = chatScrollerHeight + verticalShift * 1.09 + "px";
	document.getElementById("oceanBottom").style.top = 452 / scaleFactor - heightChange + "px";
};
OceanloungeAssistant.prototype.handleInputSpecialKeys = function(event) {
	if(document.getElementById("theChatText").value !== "") {
		var val = document.getElementById("theChatText").value;
		console.log(" " + val);
		villo.log("sending message");
		villo.chat.send({
			room : "WildnPokerChat2",
			message : val
		});
		document.getElementById("theChatText").value = "";
        if(deviceType != "webOS"){
			document.getElementById("theChatText").blur();
		}
	}
};
OceanloungeAssistant.prototype.newMessage = function(message) {
	this.playSound();
	if(doScale && !verticalMargin) {
		var addClass = "1";
	} else {
		var addClass = "";
	}
	var date = new Date();
	var meridian, hours, minutes;
	if(date.getHours() > 12) {
		hours = date.getHours() - 12;
		meridian = "pm";
	} else {
		hours = date.getHours();
		meridian = "am";
	}date.getMinutes() < 10 ? minutes = "0" + date.getMinutes() : minutes = date.getMinutes();
	var currentTime = hours + ":" + minutes + " " + meridian;
	message.timestamp = currentTime;
	var className;
	if(message.username === villo.user.username) {
		className = "1";
		switch (message.username.toLowerCase()) {
			case "fxspec06":
				className = "17";
				break;
			case "warlord":
				className = "61";
				break;
		}
	} else {
		className = "901";
		switch (message.username.toLowerCase()) {
			case "jake":
			case "kesne":
			case "noah":
				className = "710";
				break;
			case "warlord":
				className = "61585";
				break;
			case "fxspec06":
				className = "17585";
				break;
			case "patrickc":
			case "bastitch":
			case "sledge007":
				className = "874";
				break;
		}
	}
	if(message.message == "#user has entered the room.") {
		msgs2.push({
			"username" : "Wild'n Video Poker",
			"message" : message.username + message.message.substr(5),
			"timestamp" : message.timestamp,
			"className" : "17" + addClass
		});
	} else {
		msgs2.push({
			"username" : message.username,
			"message" : message.message,
			"timestamp" : message.timestamp,
			"className" : className + addClass
		});
	}
	if(this.shouldNotify) {
		createNotification({
			user : message.username,
			content : message.message,
			room : "ocean"
		});
	}
	this.displayScroller(msgs2);
	markAppForeground();
	oceanScroller.refresh();
	if(!this.shouldNotify) {
		var scrollTest = lastScrollHeight;
		var currentScrollPosition = oceanScroller.getScrollPosition();
		if( typeof (currentScrollPosition) === "undefined") {
			currentScrollPosition = 0;
		}
		if(lastScrollHeight === currentScrollPosition) {
			scrollTest = 0;
		}
		oceanScroller.revealBottom();
		var scrollerBottom = oceanScroller.getScrollPosition();
		var scrollerChange = scrollerBottom - currentScrollPosition;
		if(scrollTest) {
			scrollTest = lastScrollHeight + scrollerChange - scrollerBottom;
		}
		if(scrollTest > 0 && scrollTest != currentScrollPosition) {
			scrollTest = 0;
		}
		if(scrollerBottom != scrollerChange + currentScrollPosition + scrollTest && !this.snapNext) {
			oceanScroller.scrollTo(0, currentScrollPosition, 0, false);
		} else {
			lastScrollHeight = oceanScroller.getScrollPosition();
			this.snapNext = false;
		}
	} else {
		oceanScroller.scrollTo(0, lastScrollHeight, 0, false);
	}
};
OceanloungeAssistant.prototype.playSound = function() {
	if(!vsound) {
		return;
	}
	if(deviceType == "Android"){
		Android.playSound(14);
		return;
	}
	if(this.isPlaying1) {
		this.audioStopped1();
	};
	this.audioPlayer1.src = "audio/THROWN.wav";
	this.audioPlayer1.load();
	this.audioPlayer1.play();
	this.isPlaying1 = true;
};
OceanloungeAssistant.prototype.audioStopped1 = function(event) {
	this.audioPlayer1.src = null;
	this.audioPlayer1.pause();
	this.isPlaying1 = false;
};
OceanloungeAssistant.prototype.displayScroller = function(scrollArray) {
	/*
	 * takes an array
	 * puts it in a scrolling list
	 * via this template
	 * yeah awesome
	 */

	document.getElementById("chatList").innerHTML = "";
	var scrollerScale = scaleFactor;
	for(i in scrollArray) {
		var item = scrollArray[i];
		v1style = 'position: relative; z-index: 2;width: ' + 443 / scaleFactor + 'px; font-size:' + 14 / scaleFactor + 'px;margin:0 ' + 10 / scaleFactor + 'px;padding:' + 7 / scaleFactor + 'px;-webkit-border-radius:' + 5 / scaleFactor + 'px;';
		ustyle = 'width:' + 410 / scaleFactor + 'px;margin-left:' + 15 / scaleFactor + 'px;font-size:' + 15 / scaleFactor + 'px;';
		tstyle = 'left:' + 407 / scaleFactor + 'px;margin-top:' + 5 * scaleFactor + 'px;font-size:' + 15 / scaleFactor + 'px;';
		
		shadowsrc = "images/villo/S-RIGHT.png";
		//shadow
		v3style = 'z-index:0;width:' + 470 / scaleFactor + 'px;height:' + 55 / scaleFactor + 'px;position:absolute;left:0;margin-left:' + 4 / scaleFactor + 'px;margin-top:' + 22 / scaleFactor + 'px;';
		
		//triangle
		v2style = 'z-index: 2;margin-left:' + 390 / scaleFactor + 'px;border-style:solid;border-width:' + 7 / scaleFactor + 'px;';
		switch (item.className.substr(0, 2)) {
			case "1":
			case "61":
			case "17":
				v2style = 'z-index: 2;margin-left:' + 70 / scaleFactor + 'px;border-style:solid;border-width:' + 7 / scaleFactor + 'px;';
				shadowsrc = "images/villo/S-LEFT.png";
				break;
		}
		var piece1 = '<div class="chatCont" ><span style="' + ustyle + '" class="usernameYEAH-' + item.className + '">' + item.username + ':</span>'
		var piece2 = '<span style="' + tstyle + '" class="timestampYEAH-' + item.className + '">' + item.timestamp + '</span>'
		var piece3 = '<img alt="" style="' + v3style + '" class="v3 triangle-isosceles3-' + item.className + '" src="' + shadowsrc + '" />'
		var piece4 = '<div style="' + v1style + '" class="v1 triangle-isosceles-' + item.className + '">' + item.message + '</div>'
		var piece5 = '<div class="v2 triangle-isosceles2-' + item.className + '" style="' + v2style + '" ></div></div><div style="height:' + 12 / scaleFactor + 'px"></div>'
		document.getElementById("chatList").innerHTML += piece1 + piece2 + piece3 + piece4 + piece5;
		//console.log(piece1 + piece2 + piece3 + piece4 + piece5);
	}
};
OceanloungeAssistant.prototype.back = function() {
	this.deactivate();
	this.cleanup();
	swapScene("menu");
};
