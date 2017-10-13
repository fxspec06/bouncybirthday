function setup() {
	console.log('BGDOAHGFSIHFGDIUHDFG');
	var suits = ["hearts", "clubs", "spades", "diamonds"];
	pOt = "";
	if(appInitiate) {
		localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
		appInitiate = false;
		var BGE = wgStats[22];
		var WGE = wgStats[63];
	}
	switch (deviceType) {
		case "Android":
			webkitTransform = "scale(-1, 1)";
			//webkitTransform = "";
			break;
		default:
			webkitTransform = "rotateY(180deg)";
			break;
	}
	tStats = t1 = t2 = 0;
	document.addEventListener(window, "keydown", MenuAssistant.prototype.iconChange.bind(MenuAssistant.prototype));
	MenuAssistant.prototype.showBackdrop();
	MenuAssistant.prototype.showMenus();
	//villo.doNothing("easterEgg");
	for( x = 0; x < 4; x++) {
		document.getElementById(statsSmall[x]).style.marginLeft = horizontalMargin + "px";
		document.getElementById(statsLarge[x]).style.marginLeft = horizontalMargin + "px";
	}
	StatsAssistant.prototype.returnToMenu_ = StatsAssistant.prototype.returnToMenu.bind(StatsAssistant.prototype);
	StatsAssistant.prototype.CURRENTnSMALL_ = StatsAssistant.prototype.CURRENTnSMALL.bind(StatsAssistant.prototype);
	StatsAssistant.prototype.CURRENTpSMALL_ = StatsAssistant.prototype.CURRENTpSMALL.bind(StatsAssistant.prototype);
	StatsAssistant.prototype.ALLTIMEnSMALL_ = StatsAssistant.prototype.ALLTIMEnSMALL.bind(StatsAssistant.prototype);
	StatsAssistant.prototype.ALLTIMEpSMALL_ = StatsAssistant.prototype.ALLTIMEpSMALL.bind(StatsAssistant.prototype);
	document.getElementById("TAPZONE-LARGE").addEventListener(upEvent, StatsAssistant.prototype.returnToMenu_.bind(StatsAssistant.prototype));
	document.getElementById("CURRENTnSMALL").addEventListener(upEvent, StatsAssistant.prototype.CURRENTnSMALL_.bind(StatsAssistant.prototype));
	document.getElementById("CURRENTpSMALL").addEventListener(upEvent, StatsAssistant.prototype.CURRENTpSMALL_.bind(StatsAssistant.prototype));
	document.getElementById("ALL-TIMEnSMALL").addEventListener(upEvent, StatsAssistant.prototype.ALLTIMEnSMALL_.bind(StatsAssistant.prototype));
	document.getElementById("ALL-TIMEpSMALL").addEventListener(upEvent, StatsAssistant.prototype.ALLTIMEpSMALL_.bind(StatsAssistant.prototype));
	
	forceWait = true;
	setTimeout(function() {
		forceWait = false;
	}, 1000);
	document.getElementById("gameContents").innerHTML = '<img alt="" id="held1" class="held" style="left:23px;" src="images/HELD' + '.png" /><img alt="" id="held2" class="held" style="left:118px;" src="images/HELD' + '.png" /><img alt="" id="held3" class="held" style="left:213px;" src="images/HELD' + '.png" /><img alt="" id="held4" class="held" style="left:308px;" src="images/HELD' + '.png" /><img alt="" id="held5" class="held" style="left:403px;" src="images/HELD' + '.png" /><img alt="" id="divider" src="images/DEAL-BAR-DIVIDER' + '.png" /><img alt="" id="deal" src="images/DEAL' + '.png" /><img alt="" id="wild" src="images/WILD' + '.png" /><img alt="" id="score" src="images/SCORE' + '.png" />'
	WildngameAssistant.prototype.tapZone1_ = WildngameAssistant.prototype.tapZone1.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.tapZone2_ = WildngameAssistant.prototype.tapZone2.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.tapZone3_ = WildngameAssistant.prototype.tapZone3.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.tapZone4_ = WildngameAssistant.prototype.tapZone4.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.tapZone5_ = WildngameAssistant.prototype.tapZone5.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.secondDeal_ = WildngameAssistant.prototype.secondDeal.bind(WildngameAssistant.prototype);
	WildngameAssistant.prototype.secondDeal2_ = WildngameAssistant.prototype.secondDeal.bind(WildngameAssistant.prototype);
	document.getElementById("tapZone1").addEventListener(upEvent, WildngameAssistant.prototype.tapZone1_.bind(WildngameAssistant.prototype));
	document.getElementById("tapZone2").addEventListener(upEvent, WildngameAssistant.prototype.tapZone2_.bind(WildngameAssistant.prototype));
	document.getElementById("tapZone3").addEventListener(upEvent, WildngameAssistant.prototype.tapZone3_.bind(WildngameAssistant.prototype));
	document.getElementById("tapZone4").addEventListener(upEvent, WildngameAssistant.prototype.tapZone4_.bind(WildngameAssistant.prototype));
	document.getElementById("tapZone5").addEventListener(upEvent, WildngameAssistant.prototype.tapZone5_.bind(WildngameAssistant.prototype));
	document.getElementById("deal").addEventListener(upEvent, WildngameAssistant.prototype.secondDeal_.bind(WildngameAssistant.prototype));
	document.getElementById("deal-bar").addEventListener(upEvent, WildngameAssistant.prototype.secondDeal2_.bind(WildngameAssistant.prototype));
	if(rememberLogin) {
		document.getElementById("rememberBoxDiv").innerHTML = '<img id="rememberBox" alt="" src="images/villo/CHECKBOX-ON.png" />';
		document.getElementById("username").value = "**********";
		document.getElementById("password").value = "**********";
		document.addEventListener(document.getElementById("username"), "onchange", LoginAssistant.prototype.differentUser.bind(LoginAssistant.prototype));
	} else {
		document.getElementById("rememberBoxDiv").innerHTML = '<img id="rememberBox" alt="" src="images/villo/CHECKBOX-OFF.png" />';
	}
	/*document.getElementById("username").onmousedown = document.getElementById("username").onselectstart = function() {
		this.focus();
	}
	document.getElementById("regUsername").onmousedown = document.getElementById("regUsername").onselectstart = function() {
		this.focus();
	}*/
	document.getElementById("regUsername").value = "username";
	document.getElementById("regPassword1").value = "password";
	document.getElementById("regPassword2").value = "confirm password";
	document.getElementById("regEmail").value = "email";
	document.getElementById("regUsername").style.visibility = "hidden";
	document.getElementById("regPassword1").style.visibility = "hidden";
	document.getElementById("regPassword2").style.visibility = "hidden";
	document.getElementById("regEmail").style.visibility = "hidden";
	document.getElementById("doRegister").style.visibility = "hidden";
	if( typeof (LoginAssistant.prototype.menuArguments) != "undefined") {
		if(LoginAssistant.prototype.menuArguments === "register")
			LoginAssistant.prototype.switchLayout();
	}
	
	LoginAssistant.prototype.loginTry_ = LoginAssistant.prototype.loginTry.bind(LoginAssistant.prototype);
	LoginAssistant.prototype.loginToggle_ = LoginAssistant.prototype.loginToggle.bind(LoginAssistant.prototype);
	LoginAssistant.prototype.registerTry_ = LoginAssistant.prototype.registerTry.bind(LoginAssistant.prototype);
	LoginAssistant.prototype.back_ = LoginAssistant.prototype.back.bind(LoginAssistant.prototype);
	document.getElementById("rememberBox").addEventListener(upEvent, LoginAssistant.prototype.loginToggle_.bind(LoginAssistant.prototype));
	document.getElementById("villoBack").addEventListener(upEvent, LoginAssistant.prototype.back_.bind(LoginAssistant.prototype));
	document.getElementById("password").addEventListener("change", LoginAssistant.prototype.loginTry_.bind(LoginAssistant.prototype));
	document.getElementById("regEmail").addEventListener("change", LoginAssistant.prototype.registerTry_.bind(LoginAssistant.prototype));
	LoginAssistant.prototype.focus_ = LoginAssistant.prototype.focus.bind(LoginAssistant.prototype);
	LoginAssistant.prototype.blur_ = LoginAssistant.prototype.blur.bind(LoginAssistant.prototype);
	document.getElementById("username").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("password").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("regUsername").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("regPassword1").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("regPassword2").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("regEmail").addEventListener("focus", LoginAssistant.prototype.focus_.bind(LoginAssistant.prototype));
	document.getElementById("username").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	document.getElementById("password").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	document.getElementById("regUsername").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	document.getElementById("regPassword1").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	document.getElementById("regPassword2").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	document.getElementById("regEmail").addEventListener("blur", LoginAssistant.prototype.blur_.bind(LoginAssistant.prototype));
	/*document.getElementById("oceanLoungeLandscape").onmousedown = document.getElementById("oceanLoungeLandscape").onselectstart = function() {
		document.getElementById("theChatText").blur();
	}*/
	lastScrollHeight = 0;
	OceanloungeAssistant.prototype.audioPlayer1 = new Audio();
	OceanloungeAssistant.prototype.audioPlayer1.autoplay = false;
	OceanloungeAssistant.prototype.isPlaying1 = false;
	OceanloungeAssistant.prototype.shouldNotify = false;
	OceanloungeAssistant.prototype.snapNext = false;
	/*document.getElementById("theChatText").onmousedown = document.getElementById("username").onselectstart = function() {
		OceanloungeAssistant.prototype.focus();
	}*/
	OceanloungeAssistant.prototype.audioStopped1 = OceanloungeAssistant.prototype.audioStopped1.bind(OceanloungeAssistant.prototype);
	OceanloungeAssistant.prototype.handleInputSpecialKeys = OceanloungeAssistant.prototype.handleInputSpecialKeys.bind(OceanloungeAssistant.prototype);
	OceanloungeAssistant.prototype.displayScroller(msgs2);
	isOceanChatOpen = true;
	/*document.getElementById("skyLoungeLandscape").onmousedown = document.getElementById("skyLoungeLandscape").onselectstart = function() {
		document.getElementById("theChatText2").blur();
	}*/
	lastScrollHeight = 0;
	SkyloungeAssistant.prototype.audioPlayer1 = new Audio();
	SkyloungeAssistant.prototype.audioPlayer1.autoplay = false;
	SkyloungeAssistant.prototype.isPlaying1 = false;
	SkyloungeAssistant.prototype.shouldNotify = false;
	SkyloungeAssistant.prototype.snapNext = false;
	/*document.getElementById("theChatText2").onmousedown = document.getElementById("username").onselectstart = function() {
		SkyloungeAssistant.prototype.focus();
	}*/
	SkyloungeAssistant.prototype.audioStopped1 = SkyloungeAssistant.prototype.audioStopped1.bind(SkyloungeAssistant.prototype);
	SkyloungeAssistant.prototype.handleInputSpecialKeys = SkyloungeAssistant.prototype.handleInputSpecialKeys.bind(SkyloungeAssistant.prototype);
	SkyloungeAssistant.prototype.displayScroller(msgs);
	isSkyChatOpen = true;
	document.getElementById("all").style.visibility = "hidden";
	document.getElementById("latest").style.visibility = "hidden";
	document.getElementById("month").style.visibility = "hidden";
	document.getElementById("today").style.visibility = "hidden";
	LeaderboardsAssistant.prototype.resizeee();
	LeaderboardsAssistant.prototype.resizeee = LeaderboardsAssistant.prototype.resizeee.bind(this);
	LeaderboardsAssistant.prototype.prior = "all";
	isLeaderboardsOpen = true;
	if(horizontalMargin) {
		var tmpArray = menuObjectArray.concat(horizontalArray, statMenu, wildnGameObjects);
		for(var x in tmpArray) {
			document.getElementById(tmpArray[x]).style.marginLeft = horizontalMargin + "px";
		}
		for( x = 1; x <= 5; x++) {
			document.getElementById("tapZone" + x).style.marginLeft = horizontalMargin + "px";
			document.getElementById("held" + x).style.marginLeft = horizontalMargin + "px";
		}
	}
	if(verticalMargin) {
		var tmpArray = menuObjectArray.concat(statMenu, statsLarge, wildnGameObjects, leaderboardsArray);
		for(var x in tmpArray) {
			if(tmpArray[i] != "submit" != "submitZone")
				document.getElementById(tmpArray[x]).style.marginTop = verticalMargin + "px";
		}
		for( x = 1; x <= 5; x++) {
			document.getElementById("card" + x + "contents").style.marginTop = verticalMargin + "px";
			document.getElementById("tapZone" + x).style.marginTop = verticalMargin + "px";
			document.getElementById("held" + x).style.marginTop = verticalMargin + "px";
		}
		document.getElementById("leadersScroller").style.marginTop = verticalMargin + "px";
		document.getElementById("leadersBack").style.visibility = "hidden";
		var loginArray = ["VILLO-LOGO", "villoBack", "username", "password", "regUsername", "regPassword1", "regPassword2", "regEmail"];
		for( x = 0; x < loginArray.length; x++) {
			document.getElementById(loginArray[x]).style.marginTop = verticalMargin + "px";
		}
		document.getElementById("villoBack").style.visibility = "hidden";
	}
	if(doScale) {
		for( x = 0; x < 4; x++) {
			document.getElementById(suits[x] + "Div").innerHTML = '<img id="' + suits[x] + '"alt="" src="images/suits/' + suits[x] + '2.png" style="position:fixed;" />';
			document.getElementById(suits[x]).style.width = 80 / scaleFactor + "px";
			document.getElementById(suits[x]).style.height = 80 / scaleFactor + "px";
		}
		document.getElementById("chatScroller2").style.marginLeft = horizontalMargin + "px";
		document.getElementById("SKY-LIGHT").style.marginLeft = horizontalMargin + "px";
		document.getElementById("chatScroller").style.marginLeft = horizontalMargin + "px";
		document.getElementById("OCEAN-LIGHT").style.marginLeft = horizontalMargin + "px";
		document.getElementById("skyBottom").style.marginLeft = horizontalMargin + "px";
		document.getElementById("oceanBottom").style.marginLeft = horizontalMargin + "px";
		for(var i in leaderboardsArray) {
			document.getElementById(leaderboardsArray[i]).style.marginLeft = horizontalMargin + "px";
		}
		document.getElementById("VILLO-LOGO").style.marginLeft = horizontalMargin + "px";
		document.getElementById("registerBtn").style.marginLeft = horizontalMargin * 2 + "px";
		document.getElementById("doRegister").style.marginLeft = horizontalMargin * 2 + "px";
		document.getElementById("rememberBox").style.marginLeft = horizontalMargin * 2 + "px";
		var chatScrollerTop = 55 / scaleFactor;
		document.getElementById("VILLO-LOGO").style.marginTop = "40px";
		document.getElementById("oceanLoungeLandscape").innerHTML = '<img alt="" id="oceanbg" style="margin-top:' + verticalMargin + 'px;" src="images/backdrops/backdrop1.jpg"></img><img id="oceanbg2" src="images/backdrops/backdrop1.jpg"  style="position:fixed; top: ' + window.innerHeight * 0.08 + 'px;margin-top:' + verticalMargin + 'px;" />';
		document.getElementById("skyLoungeLandscape").innerHTML = '<img alt="" id="skybg" style="margin-top:' + verticalMargin + 'px;" src="images/backdrops/backdrop1.jpg"></img><img id="skybg2" src="images/backdrops/backdrop1.jpg"  style="position:fixed; top: ' + window.innerHeight * 0.08 + 'px;margin-top:' + verticalMargin + 'px;" />';
		document.getElementById("chatScroller").style.top = chatScrollerTop + verticalMargin * 2.5 + "px";
		document.getElementById("chatScroller2").style.top = chatScrollerTop + verticalMargin * 2.5 + "px";
		document.getElementById("SKY-LIGHT").style.marginTop = verticalMargin * 3 + "px";
		document.getElementById("OCEAN-LIGHT").style.marginTop = verticalMargin * 3 + "px";
		document.getElementById("leadersLandscape").innerHTML = '<img alt="" id="leadersbg" style="margin-top:' + verticalMargin + 'px;" src="images/backdrops/backdrop1.jpg"></img><img id="leadersbg2" src="images/backdrops/backdrop1.jpg"  style="position:fixed; top: ' + window.innerHeight * 0.08 + 'px;margin-top:' + verticalMargin + 'px;" />';
		document.getElementById("leadersScroller").style.marginLeft = horizontalMargin + "px";
		var newArrayObjects = new Array(0);
		for( x = 1; x <= 5; x++) {
			newArrayObjects.push("tapZone" + x);
			newArrayObjects.push("held" + x);
		}
		scale(statMenu.concat(
			menuObjectArray,
			statsLarge,
			statsSmall,
			wildnGameObjects,
			newArrayObjects,
			leaderboardsArray,
			["score", "VILLO-LOGO", "loginBtn", "registerBtn", "doRegister", "villoBack", "rememberBox",
			"leadersBack","SKY-LIGHT", "skyBack","OCEAN-LIGHT", "oceanBack"]
		));
		var newArrayObjects = new Array(0);
		for( x = 1; x <= 5; x++) {
			newArrayObjects[newArrayObjects.length] = "card" + x + "contents";
			newArrayObjects[newArrayObjects.length] = "card" + x + "backside";
			newArrayObjects[newArrayObjects.length] = "card" + x;
			if(horizontalMargin) {
				document.getElementById("card" + x).style.marginLeft = horizontalMargin + "px";
				document.getElementById("card" + x + "backside").style.marginLeft = horizontalMargin + "px";
			}
		}
		scale(newArrayObjects.concat(["skyBottom","oceanBottom"]), true, true, true, true, "div");
		scale(["leadersScroller"], true, false, true, true, "div");
		scale(["chatScroller","chatScroller2"], false, false, true, moveVertically, "div");
		scale(["skybg", "skybg2", "oceanbg", "oceanbg2"], false, true, false, moveVertically);
		scale(["username", "password", "regUsername", "regPassword1", "regPassword2", "regEmail"],true, false, false, false, "input");
		scale(["leadersbg", "leadersbg2"], false, true, false);
		scale(["theChatText", "theChatText2"], true, true, false, false, "input");
		var resizeBoxes = ["username", "password", "regUsername", "regPassword1", "regPassword2", "regEmail"];
		for(var i in resizeBoxes) {
			document.getElementById(resizeBoxes[i]).style.fontSize = 12 / scaleFactor + "px";
		}
		scale(resizeBoxes, false, true, false, false, "input");
		document.getElementById("theChatText").style.webkitBorderRadius = 5 / scaleFactor + "px";
		document.getElementById("theChatText").style.fontSize = 12 / scaleFactor + "px";
		document.getElementById("theChatText2").style.webkitBorderRadius = 5 / scaleFactor + "px";
		document.getElementById("theChatText2").style.fontSize = 12 / scaleFactor + "px";
		document.getElementById("oceanbg").style.zIndex = "0";
		document.getElementById("oceanbg2").style.zIndex = "0";
		document.getElementById("skybg").style.zIndex = "0";
		document.getElementById("skybg2").style.zIndex = "0";
		document.getElementById("leadersbg").style.zIndex = "0";
		document.getElementById("leadersbg2").style.zIndex = "0";
		if(verticalMargin) {
			document.getElementById("back2").style.visibility = "hidden";
		}
		WildngameAssistant.prototype.back_ = WildngameAssistant.prototype.back.bind(WildngameAssistant.prototype);
	}
	bounceIcons()
	document.getElementById("back2").addEventListener(upEvent, WildngameAssistant.prototype.back_.bind(WildngameAssistant.prototype));
	LoginAssistant.prototype.resize();
	LeaderboardsAssistant.prototype.resizeee();
}