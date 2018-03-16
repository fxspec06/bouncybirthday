/*
 *
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 *
 */

function LoadAssistant() {
}

LoadAssistant.prototype.setup = function() {
	/*window.onmousedown = window.onselectstart = function(e) {
		return false;
	}*/
	window.onmouseup = function(e) {
		lastID = "";
		return true;
	}
	window.onresize = function(e) {
		LoginAssistant.prototype.resize();
		SkyloungeAssistant.prototype.resizee();
		OceanloungeAssistant.prototype.resizee();
	}
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	doScale = true;
	scaleFactor = 348 / windowHeight;
	
	if(deviceType == "webOS" || deviceType == "Android"){
		scaleFactor = 320 / windowHeight;
	}
	
	if((windowWidth / windowHeight) < 1.5) {
		scaleFactor = 480 / windowWidth;
		if(deviceType == "iOS") {
			//scaleFactor = scaleFactor / 1.0006
		};
		if(deviceType == "Android"){
			moveVertically = true;
			verticalMargin = 5;
		}
	}

	/*
	 * horizontal scaler
	 */
	var gameWidth = 480 / scaleFactor;
	var spareWidth = windowWidth - gameWidth;
	var leftTarget = windowWidth / 2 - gameWidth / 2;
	horizontalMargin = ((leftTarget * scaleFactor) / (scaleFactor + 1));
	horizontalMargin <= 0 ? horizontalMargin = 0.1 : null;
	document.getElementById("touchPadDiv").innerHTML = '<img alt="" id="game2" src="images/backdrops/backdrop1.jpg" style="position:fixed; top:680px;" />';
	var touchPadMargin = 0;
	document.getElementById("load-scene").style.display = null;
	if(doScale || moveVertically) {
		if(moveVertically) {
			doScale = true;
			for( x = 0; x < loadMenu.length; x++) {
				document.getElementById(loadMenu[x]).style.marginTop = verticalMargin + "px";
			}
			document.getElementById("game").style.marginTop = verticalMargin + "px";
			document.body.style.background = 'url("images/backdrops/backdrop1.jpg")';
			document.body.style.backgroundRepeat = "repeat";
		}
		if(horizontalMargin) {
			for( x = 0; x < loadMenu.length; x++) {
				document.getElementById(loadMenu[x]).style.marginLeft = horizontalMargin + "px";
			}
		}
		scale(loadMenu);
		scale(["game"], false, true);
		scale(["game2"], false, true, false, false);
	}
	
	var tmp = (70 - 0.5 * verticalMargin);
	var tmp2 = (verticalMargin / 2 * 5);
	simplify1 = Math.round(tmp) / scaleFactor;
	simplify2 = Math.round((480 - tmp)) / scaleFactor;
	simplify3 = window.innerHeight - (80 / scaleFactor);
	test1 = (verticalMargin + simplify1);
	test2 = window.innerWidth - (80 / scaleFactor);
	shortcut1 = '.png" style="margin-top:' + verticalMargin + 'px; left:';
	
	speed = 20;
	if(deviceType == "iOS" && windowWidth < 1000){
        speed = 35;
    }
	document.getElementById("mainMenuTitle").style.visibility = "visible";
	wgRankLevel = wildnGameSettings.wgRankLevel;
	bgRankLevel = wildnGameSettings.bgRankLevel;
	autoDeal = wildnGameSettings.autoDeal;
	sound = wildnGameSettings.sound;
	vsound = wildnGameSettings.vsound;
	vnotifications = wildnGameSettings.vnotifications;
	cardBack = wildnGameSettings.cardBack;
	gameBack = wildnGameSettings.gameBack;
	nextSubmission = wildnGameSettings.nextSubmission;
	rememberLogin = wildnGameSettings.rememberLogin;
	didTutorial = wildnGameSettings.didTutorial;
	console.log("Next Submission: " + nextSubmission);
	canSubmit = false;
	if(nextSubmission === 0) {
		canSubmit = true;
	}
	if(!didTutorial) {
		menuStatus = "freshInstall";
	}
	this.didLoad = false;
	setTimeout(this.avatar.bind(this), 0);
	this.goToMain = this.goToMain.bind(this);

	
	
	currentScene = "load";

	for(var i = 0; i < numBackdrops; i++) {
		var img = new Image;
		img.src = "images/backdrops/backdrop" + (i + 1) + ".jpg";
	}
	for(var i = 0; i < numCardBacks; i++) {
		var img = new Image;
		img.src = "images/card-backs/back" + (i + 1) + ".png";
	}

	MenuAssistant.prototype.showBackdrop();
	activateButtons();
	loadSounds();
	this.activate();
};	

LoadAssistant.prototype.goToMain = function(event) {
	this.deactivate();
	//this.cleanup();
	setTimeout(function(){
		swapScene("menu");
		document.getElementById("wildngame-scene").style.display = 'none';
	}.bind(this), 0);
	
};
LoadAssistant.prototype.splash = function(event) {
	document.getElementById("preSplash").style.visibility = "hidden";
	document.getElementById("load").style.visibility = "visible";
	setTimeout(this.blink.bind(this), 1100);
};
LoadAssistant.prototype.avatar = function(event) {
	document.getElementById("preSplash").style.visibility = "hidden";
	setTimeout(this.preSplash.bind(this), 3000);
};
LoadAssistant.prototype.preSplash = function(event) {
	document.getElementById("avatar").style.visibility = "hidden";
	/* SET THIS VARIABLE TO 3000 FOR VILLO SPLASH SCREEN,
		SET TO 0 TO SKIP VILLO SPLASH SCREEN */
	var VilloSplash = 0;
	setTimeout(this.splash.bind(this), VilloSplash);
	setTimeout(this.loaded.bind(this), VilloSplash+3000);
	document.getElementById("preSplash").style.visibility = "visible";
};
LoadAssistant.prototype.activate = function() {
	if(localStorage["wildnGameStats"]) {
		wildnGameStats = localStorage["wildnGameStats"];
		wildnGameStats = JSON.parse(wildnGameStats);
	}
	console.log(wildnGameStats);
	this.setStats();
	
	document.getElementById("TAP").addEventListener("click", this.goToMain.bind(this));
};
LoadAssistant.prototype.deactivate = function() {
	window.clearTimeout(t);
	document.getElementById("TAP").removeEventListener("click", this.goToMain.bind(this));
};
LoadAssistant.prototype.blink = function(e) {
	if(!this.didLoad) {document.getElementById("BLINK").style.visibility === "visible" ? document.getElementById("BLINK").style.visibility = "hidden" : document.getElementById("BLINK").style.visibility = "visible";
	} else {document.getElementById("CONTINUE").style.visibility === "visible" ? document.getElementById("CONTINUE").style.visibility = "hidden" : document.getElementById("CONTINUE").style.visibility = "visible";
		document.getElementById("BLINK").style.visibility = "hidden";
	}
	t = setTimeout(this.blink.bind(this), 700);
};
LoadAssistant.prototype.loaded = function() {
	window.clearTimeout(t);
	this.didLoad = true;
	document.getElementById("BLINK").style.visibility === "hidden";
	document.getElementById("TAP").style.visibility = "visible";
	
	
/* MODIFIED******* OLD
	this.blink();
*/
/* NEW */
	this.goToMain();
};
LoadAssistant.prototype.setStats = function() {
	var c = 0;
	var x;
	for(value in wildnGameStats) {
		wgStats[c] = wildnGameStats[value];
		//console.log(wildnGameStats[value]);
		c++;
	}
	var y = 14;
	do {
		x = y - 1;
		wgStats[x + 14] = wgStats[x + 14] + wgStats[x];
	} while (--y);
	y = 24;
	do {
		x = y + 28 - 1;
		wgStats[x + 24] = wgStats[x + 24] + wgStats[x];
	} while (--y);
};
