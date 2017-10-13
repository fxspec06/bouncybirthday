/*
 *
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 *
 */

function MenuAssistant() {
}

MenuAssistant.prototype.activate = function(event) {
	if (reActivateIcons && betStatus != "bet") {bounceIcons()};
	switch (betStatus) {
		case "fastBet":
			this.loadBet();
			break;
		case "bet":
			this.bet();
			break;
	}
	this.showMenus();
	markAppForeground();
};
MenuAssistant.prototype.deactivate = function(event) {
	window.clearTimeout(tO1);window.clearTimeout(tO2);window.clearTimeout(tO3);window.clearTimeout(tO4);window.clearTimeout(tO5);
	window.clearTimeout(t1);window.clearTimeout(t2);window.clearTimeout(tStats);window.clearTimeout(pOt);
};
MenuAssistant.prototype.showMenus = function() {
return;
	document.getElementById("mainMenuTitle").style.visibility = "visible";
	currentScene = "menu";
	var i;
	document.getElementById("back").style.top = (250 + verticalMargin) / scaleFactor + "px";
	switch(menuStatus) {
		case "sub":
			i = subMenu.length - 1;
			do {
				document.getElementById(subMenu[i]).style.visibility = "visible";
			} while (i--);
			if(typeof (difficulty) != "undefined") { //show bet and back buttons....
				document.getElementById("BET").style.visibility = "visible";
				document.getElementById("back").style.top = (290 + verticalMargin) / scaleFactor + "px";
			}
			this.showRanks();
			break;
		case "main":
			i = mainMenu.length - 1;
			do {
				document.getElementById(mainMenu[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "areYouSure":
			i = areYouSure.length - 1;
			do {
				document.getElementById(areYouSure[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "options":
			this.loadOptions(this);
			i = options.length - 1;
			do {
				document.getElementById(options[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "payouts":
			document.getElementById(payouts[0]).style.visibility = "visible";
			var k;
			if(playingWildnGame) {
				k = 1;
			} else {
				k = 3;
			}
			document.getElementById(payouts[k]).style.visibility = "visible";
			this.flashPayouts();
			break;
		case "about":
			i = about.length - 1;
			do {
				document.getElementById(about[i]).style.visibility = "visible";
			} while (i--);
			this.flashAbout();
			break;
		case "themes":
			cardBack = wildnGameSettings.cardBack;
			this.showCard();
			backdrop = wildnGameSettings.gameBack;
			this.showBackdrop();
			i = themes.length - 1;
			do {
				document.getElementById(themes[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "freshInstall":
			this.setUpFreshInstall();
			break;
		case "villoRegister":
			document.getElementById("villoLight").style.visibility = "visible";
			document.getElementById("villoRegister").style.visibility = "visible";
			document.getElementById("villoRegisterYes").style.visibility = "visible";
			document.getElementById("villoRegisterNo").style.visibility = "visible";
			break;
		case "villo":
			i = villoMenu.length - 1;
			do {
				document.getElementById(villoMenu[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "villoOptions":
			this.loadVilloOptions();
			i = villoOptions.length - 1;
			do {
				document.getElementById(villoOptions[i]).style.visibility = "visible";
			} while (i--);
			document.getElementById("villoLight").style.visibility = "visible";
			document.getElementById("sound").style.visibility = "visible";
			break;
		case "backupRestore":
			i = backupRestore.length - 1;
			do {
				document.getElementById(backupRestore[i]).style.visibility = "visible";
			} while (i--);
			document.getElementById("villoLight").style.visibility = "visible";
			break;
		case "help":
			i = help.length - 1;
			do {
				document.getElementById(help[i]).style.visibility = "visible";
			} while (i--);
			break;
		case "tutorial":
			//i = tutorial.length - 1;
			//do {
				document.getElementById(tutorial[0]).style.visibility = "visible";
				document.getElementById(tutorial[1]).style.visibility = "visible";
			//} while (i--);
			document.getElementById("TTC").style.visibility = "visible";
			this.tutorial();
			break;
	}
	//////////////////////////////////////BET////////////////////////////////////
	if (betStatus === "resumeBet" || betStatus === "fastBet") {
		var scaleTheseBets = new Array(0);
		if(betStatus === "fastBet") {
			while(bet > money) {
				bet = bet - minBet;
			}
		}
		var pushOver = 0;
		if(bet < 10) {
			pushOver = -1;
		}
		var maxBet = minBet * 5;
		while(money < maxBet) {
			maxBet = maxBet - minBet;
		}
		document.getElementById("changeBet").style.visibility = "visible";
		document.getElementById("resumeBet").style.visibility = "visible";
		betDigit1 = (bet + "")[0];
		betDigit2 = (bet + "")[1];
		if(bet > minBet) {
			if(minBet > 99) {
				pushOver = 1;
			}
			document.getElementById("minus").style.visibility = "visible";
			betDigit3 = (bet + "")[2];
			if(pushOver === 1) {
				document.getElementById("betDigit3div").innerHTML = '<img alt="" id="betDigit3" class="betDigit" src="images/menu/bet/' + betDigit3 + '.png" style="left:' + (285 - 22 * pushOver + horizontalMargin) + 'px;">';
				scaleTheseBets[scaleTheseBets.length] = "betDigit3";
			}
		} else {
			document.getElementById("minus").style.visibility = "hidden";
		}
		if(bet + minBet <= maxBet) {
			document.getElementById("plus").style.visibility = "visible";
		} else {
			document.getElementById("plus").style.visibility = "hidden";
		}
		console.log(bet + "," + minBet + "," + maxBet);
		var pushOver = 0;
		if(bet < 10) {
			pushOver = -1;
		}
		if(pushOver === 0) {
			document.getElementById("betDigit2div").innerHTML = '<img alt="" id="betDigit2" class="betDigit" src="images/menu/bet/' + betDigit2 + '.png" style="margin-top:' + verticalMargin + 'px; left:' + (240 - 22 * pushOver + horizontalMargin) + 'px;">';
			scaleTheseBets[scaleTheseBets.length] = "betDigit2";
		} else {
			try{
				document.getElementById("betDigit2").style.visibility = "hidden";
			} catch (e){};
		}
		document.getElementById("betDigit1div").innerHTML = '<img alt="" id="betDigit1" class="betDigit" src="images/menu/bet/' + betDigit1 + '.png" style="margin-top:' + verticalMargin + 'px; left:' + (195 - 22 * pushOver + horizontalMargin) + 'px;">';
		scaleTheseBets[scaleTheseBets.length] = "betDigit1";
		if(doScale) {
			scale(scaleTheseBets);
		}
	}////////////////////////////END BET/////////////////////////////////////
};
MenuAssistant.prototype.tutorial = function() {
	var tutorialString = tutorialType + (tutorialStatus + 1);
	//console.log(tutorialString);
	document.getElementById("tutorialDiv").innerHTML = '<img alt="" style="margin-left:' + horizontalMargin + 'px;" id="' + tutorialString + '" class="fullScreen" src="images/menu/options/help/' + tutorialString + '.png" /><div id="versionString"></div>';
	if(doScale){
		scale([tutorialString]);
	}
	document.getElementById(tutorialString).style.marginLeft = horizontalMargin + "px";
	document.getElementById(tutorialString).style.visibility = "visible";
	tutorialStatus++;
	switch (tutorialType){
		case "villo":
			document.getElementById("villoLight").style.visibility = "visible";
			if(tutorialStatus == numTutorialSections){
				document.getElementById("villoURL").style.visibility = "visible";
				document.getElementById("villoTWITTER").style.visibility = "visible";
				document.getElementById("webosworldURL").style.visibility = "visible";
				document.getElementById("webosworldTWITTER").style.visibility = "visible";
			}
			break;
		case "about":
			if(tutorialStatus == numTutorialSections){
				document.getElementById("twitter").style.visibility = "visible";
				document.getElementById("email").style.visibility = "visible";
				document.getElementById("wildntwitter").style.visibility = "visible";
				
				/*
				 * show version number
				 */
				var versionString = wildnGameSettings.versionString;
				
				var num1 = '<img id="v1" alt="" src="images/menu/numbers/' + versionString[0] + '.png" class="versionNumber" style="left:330px;" />';
				var num2 = '<img id="v2" alt="" src="images/menu/numbers/' + versionString[2] + '.png" class="versionNumber" style="left:350px;" />';
				var num3 = '<img id="v3" alt="" src="images/menu/numbers/' + versionString[4] + '.png" class="versionNumber" style="left:370px;" />';
				versionString = num1 + '<img id="v4" alt="" src="images/menu/numbers/P.png" class="versionNumber" style="left:340px;" />' + num2 + '<img id="v5" alt="" src="images/menu/numbers/P.png" class="versionNumber" style="left:360px;" />' + num3;
				document.getElementById("versionString").innerHTML = versionString;
				for(x = 0; x < 5; x++){
					document.getElementById("v" + (x + 1)).style.marginLeft = horizontalMargin + "px";
					document.getElementById("v" + (x + 1)).style.marginTop = verticalMargin + "px";
				}
				if(doScale){
					scale(["v1","v2","v3","v4","v5"]);
				}
			}
			break;
	}
	this.flashTTC();
};
MenuAssistant.prototype.flashTTC = function(event){
	document.getElementById("TTC").style.visibility === "visible" ?
		document.getElementById("TTC").style.visibility = "hidden" : document.getElementById("TTC").style.visibility = "visible";
	pOt = window.setTimeout(this.flashTTC.bind(this), 1000);
};
MenuAssistant.prototype.openInBrowser = function(targetID) {
	var tmpURL = "";
	switch (targetID) {
		case "villoURL":
			tmpURL = "www.villo.net/";
			break;
		case "villoTWITTER":
			tmpURL = "twitter.com/villo";
			break;
		case "webosworldURL":
			tmpURL = "webosworld.com/";
			break;
		case "webosworldTWITTER":
			tmpURL = "twitter.com/webosworld";
			break;
		case "twitter":
			tmpURL = "twitter.com/fxspec06";
			break;
		case "wildntwitter":
			tmpURL = "twitter.com/wildnpoker";
			break;
	}
	switch(deviceType) {
		case "webOS":
		case "Android":
			window.open("http://www." + tmpURL);
			break;
		default:
			document.location = "wildnpoker:" + "openSafari:" + tmpURL;
			break;
	}
};
MenuAssistant.prototype.openEmail = function() {
	switch(deviceType) {
		case "webOS":
		case "Android":
			window.open("mailto:bshado@charter.net?subject=Wild'n Video Poker v" + wildnGameSettings.versionString);
			break;
		default:
			document.location = "wildnpoker:" + "openMail:" + "bshado@charter.net?subject=Wild'n Video Poker v" +wildnGameSettings.versionString;
			break;
	}
};
MenuAssistant.prototype.setUpFreshInstall = function(){
	isInTutorial = true;
	menuStatus = "tutorial";
	tutorialType = "about";
	numTutorialSections = 1;
	//this.tutorial();
	window.setTimeout(function(){swapScene("menu")}, 1000);
};
MenuAssistant.prototype.continueTutorial = function(){
	switch (tutorialType){
		case "about":
			menuStatus = "tutorial";
			tutorialType = "howToPlay";
			numTutorialSections = 8;
			swapScene("menu");
			break;
		case "howToPlay":
			menuStatus = "tutorial";
			tutorialType = "villo";
			numTutorialSections = 7;
			swapScene("menu");
			break;
		case "villo":
			this.welcome();
			break;
	}
};
MenuAssistant.prototype.iconChange = function(event) {
	eventKeyCode = event.originalEvent.keyCode;
	if(eventKeyCode == 61) {
		if(reActivateIcons) {
			reActivateIcons = false;
		} else {
			reActivateIcons = true;
		}
		swapScene("menu");
	} else if(eventKeyCode == 39 && speed < 100) {
		speed = speed + 5;
	} else if(eventKeyCode == 222 && speed > 10) {
		speed = speed - 5;
	}
};
MenuAssistant.prototype.bet = function(event) {
	this.loadBet();
	betStatus = "resumeBet";
	swapScene("menu");
};
MenuAssistant.prototype.previousBackdrop = function() {
	var tmpBackdropNumber = gameBack;
	tmpBackdropNumber--;
	if (tmpBackdropNumber === 0){
		tmpBackdropNumber = numBackdrops;
	}
	gameBack = tmpBackdropNumber;
	this.showBackdrop();
};
MenuAssistant.prototype.nextBackdrop = function() {
	var tmpBackdropNumber = gameBack;
	tmpBackdropNumber++;
	if (tmpBackdropNumber > numBackdrops){
		tmpBackdropNumber = 1;
	}
	gameBack = tmpBackdropNumber;
	this.showBackdrop();
};
MenuAssistant.prototype.showBackdrop = function(){
	document.getElementById("showBackdropDiv").innerHTML = '<img alt="" id="game" style="margin-top: ' + verticalMargin + 'px;" src="images/backdrops/backdrop' + gameBack + '.jpg" />';
	document.getElementById("touchPadDiv").innerHTML = '<img alt="" id="game2" src="images/backdrops/backdrop' + gameBack + '.jpg" style="position:fixed; top: ' + window.innerHeight*0.08 + 'px;" /><img alt="" id="back2" class="menuOption5" src="images/menu/sub/BACK.png" />';
	//document.getElementById("screwThis").style.backgroundImage = "url(images/backdrops/backdrop" + gameBack + ".jpg)";
	if(doScale) {
		document.getElementById("back2").style.top = "323px";
		document.getElementById("back2").style.left = "0px";
		scale(["game","back2"], false);
		scale(["game2"], false, true, false, false);
	}
	if(horizontalMargin){
		document.getElementById("game").style.width = window.innerWidth + "px";
		document.getElementById("game2").style.width = window.innerWidth + "px";
	}
};
MenuAssistant.prototype.previousCard = function() {
	var tmpCardNumber = parseInt(cardBack[4] + cardBack[5]);
	tmpCardNumber--;
	if (tmpCardNumber === 0){
		tmpCardNumber = numCardBacks;
	}
	cardBack = "back" + tmpCardNumber;
	this.showCard();
};
MenuAssistant.prototype.nextCard = function() {
	var tmpCardNumber = parseInt(cardBack[4] + cardBack[5]);
	tmpCardNumber++;
	if (tmpCardNumber > numCardBacks){
		tmpCardNumber = 1;
	}
	cardBack = "back" + tmpCardNumber;
	this.showCard();
};

MenuAssistant.prototype.flashPayouts = function(event) {
	var a;
	if(playingWildnGame) {
		a = 2;
	} else {
		a = 4;
	}
	if(document.getElementById(payouts[a]).style.visibility === "visible") {
		document.getElementById(payouts[a]).style.visibility = "hidden";
	} else {
		document.getElementById(payouts[a]).style.visibility = "visible";
	}
	pOt = window.setTimeout(this.flashPayouts.bind(this), 1000);
};
MenuAssistant.prototype.flashWelcome = function(event) {
	if(document.getElementById(welcome[1]).style.visibility === "visible") {
		document.getElementById(welcome[1]).style.visibility = "hidden";
	} else {
		document.getElementById(welcome[1]).style.visibility = "visible";
	}
	if( typeof (freshInstall) === "undefined") {
		if(document.getElementById(welcome[2]).style.visibility === "visible") {
			document.getElementById(welcome[2]).style.visibility = "hidden";
		} else {
			document.getElementById(welcome[2]).style.visibility = "visible";
		}
	}
	pOt = window.setTimeout(this.flashWelcome.bind(this), 1000);
};
MenuAssistant.prototype.back = function() {
	switch (menuStatus) {
		case "sub":
		case "villo":
			menuStatus = "main";
			break;
		case "options":
			menuStatus = "main";
			break;
		case "themes":
		case "help":
			menuStatus = "options";
			break;
		case "villoOptions":
			menuStatus = "villo";
			break;
		case "backupRestore":
			menuStatus = "villoOptions";
			break;
	}
	swapScene("menu");
};
MenuAssistant.prototype.loadOptions = function() {
	if( typeof (wildnGameSettings.autoDeal) === "undefined") {
		wildnGameSettings.autoDeal = true;
	}
	if(wildnGameSettings.autoDeal) {
		document.getElementById("autoDealStatusDiv").innerHTML = '<img alt="" id="autoDealStatus" class="autoDealStatus" src="images/menu/options/ON.png" style="width:50px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	} else {
		document.getElementById("autoDealStatusDiv").innerHTML = '<img alt="" id="autoDealStatus" class="autoDealStatus" src="images/menu/options/OFF.png" style="width:68px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	}
	if(wildnGameSettings.sound) {
		document.getElementById("soundStatusDiv").innerHTML = '<img alt="" id="soundStatus" class="soundStatus" src="images/menu/options/ON.png" style="width:50px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	} else {
		document.getElementById("soundStatusDiv").innerHTML = '<img alt="" id="soundStatus" class="soundStatus" src="images/menu/options/OFF.png" style="width:68px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	}
	if(doScale) {
		scale(["soundStatus", "autoDealStatus"]);
	}
	
	document.getElementById("autoDealStatus").addEventListener('click', menuButtonTap.bind(this));
	document.getElementById("soundStatus").addEventListener('click', menuButtonTap.bind(this));
};
MenuAssistant.prototype.loadVilloOptions = function() {
	if(wildnGameSettings.vsound) {
		document.getElementById("soundStatusDiv").innerHTML = '<img alt="" id="soundStatus" class="soundStatus" src="images/menu/options/ON.png" style="width:50px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	} else {
		document.getElementById("soundStatusDiv").innerHTML = '<img alt="" id="soundStatus" class="soundStatus" src="images/menu/options/OFF.png" style="width:68px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	}
	if(wildnGameSettings.vnotifications) {
		document.getElementById("vnotificationsStatusDiv").innerHTML = '<img alt="" id="vnotificationsStatus" class="vnotificationsStatus" src="images/menu/options/ON.png" style="width:50px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	} else {
		document.getElementById("vnotificationsStatusDiv").innerHTML = '<img alt="" id="vnotificationsStatus" class="vnotificationsStatus" src="images/menu/options/OFF.png" style="width:68px; margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	}
	if(doScale) {
		scale(["soundStatus"]);
		scale(["vnotificationsStatus"]);
	}
	document.getElementById("vnotificationsStatus").addEventListener('click', menuButtonTap.bind(this));
	document.getElementById("soundStatus").addEventListener('click', menuButtonTap.bind(this));
	document.getElementById("vnotificationsStatusDiv").style.visibility = "hidden";
};
MenuAssistant.prototype.sound = function(event) {
	switch (menuStatus){
		case "options":
			if(wildnGameSettings.sound) {
				wildnGameSettings.sound = false;
			} else if(!wildnGameSettings.sound) {
				wildnGameSettings.sound = true;
			}
			break;
		case "villoOptions":
			if(wildnGameSettings.vsound === true) {
				wildnGameSettings.vsound = false;
			} else {
				wildnGameSettings.vsound = true;
			}
			break;
	};
	sound = wildnGameSettings.sound;
	vsound = wildnGameSettings.vsound;
	stage.saveOptions();
	this.showMenus();
};
MenuAssistant.prototype.autoDeal = function(event) {
	if(wildnGameSettings.autoDeal) {
		wildnGameSettings.autoDeal = false;
	} else if(!wildnGameSettings.autoDeal) {
		wildnGameSettings.autoDeal = true;
	}
	wildnGameSettings.resumePause = false;
	autoDeal = wildnGameSettings.autoDeal;
	stage.saveOptions();
	this.showMenus();
};
MenuAssistant.prototype.vnotifications = function(event) {
	if(wildnGameSettings.vnotifications) {
		wildnGameSettings.vnotifications = false;
	} else if(!wildnGameSettings.vnotifications) {
		wildnGameSettings.vnotifications = true;
	}
	vnotifications = wildnGameSettings.vnotifications;
	stage.saveOptions();
	this.showMenus();
};
MenuAssistant.prototype.handleCommand = function(event) {
	if(event.type === Mojo.Event.back) {
		event.stop();
	}
};
MenuAssistant.prototype.resumeBet = function() {
	document.getElementById("betDigit1div").innerHTML = "";
	document.getElementById("betDigit2div").innerHTML = "";
	document.getElementById("betDigit3div").innerHTML = "";
	if(betStatus === "resumeBet" || betStatus === "fastBet") {
		if(playingWildnGame) {
			minBet = minBet / difficulty;
			bet = bet / difficulty;
			if(bet != wildnGameSettings.wgBet) {
				wildnGameSettings.resumePause = false;
				isFlashing = true;
			}
			wildnGameSettings.wgBet = bet;
		} else {
			if(bet != wildnGameSettings.bgBet) {
				wildnGameSettings.resumePause = false;
				isFlashing = true;
			}
			wildnGameSettings.bgBet = bet;
		}
		stage.saveGame();
		menuStatus = "sub";
		betStatus = "no";
		swapScene("wildngame");
	}
};
MenuAssistant.prototype.loadBet = function() {
	if(playingWildnGame) {
		bet = wildnGameSettings.wgBet;
		bet = bet * difficulty;
		minBet = minBet * difficulty;
	} else {
		bet = wildnGameSettings.bgBet;
	}
};
MenuAssistant.prototype.welcome = function() {
	didTutorial = true;
	isInTutorial = false;
	if(typeof(freshInstall) === "undefined"){
		stage.saveOptions();
		menuStatus = "main";
		swapScene("menu");
		return;
	}
	this.resetEverything();

	window.clearTimeout(pOt);
	menuStatus = "villoRegister";
	swapScene("menu");
};
MenuAssistant.prototype.showCard = function() {
	document.getElementById("showCardDiv").innerHTML = '<img alt="" id="showCard" src="images/card-backs/' + cardBack + '.png" style="margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;">';
	if(doScale) {
		scale(["showCard"]);
	}
};
MenuAssistant.prototype.wildnGame = function() {
	if(!playingWildnGame) {
		wildnGameSettings.resumePause = false;
	}
	playingWildnGame = true;
	menuStatus = "sub";
	swapScene("menu");
};
MenuAssistant.prototype.basicGame = function() {
	if(playingWildnGame) {
		wildnGameSettings.resumePause = false;
	}
	playingWildnGame = false;
	menuStatus = "sub";
	swapScene("menu");
};
MenuAssistant.prototype.warnBackup = function(event){
	var i = backupRestore.length - 1;
	do {
		document.getElementById(backupRestore[i]).style.visibility = "hidden";
	} while (i--);
	document.getElementById("warnBackup").style.visibility = "visible";
	document.getElementById("startBackup").style.visibility = "visible";
	document.getElementById("cancel").style.visibility = "visible";
};
MenuAssistant.prototype.startBackup = function(event){
	document.getElementById("warnBackup").style.visibility = "hidden";
	document.getElementById("startBackup").style.visibility = "hidden";
	document.getElementById("cancel").style.visibility = "hidden";
	villo.common.set({
		title : "stats",
		data : wgStats,
		callback: this.backupCallback1.bind(this)
	});
};
MenuAssistant.prototype.backupCallback1 = function(sof) {
	console.log("CALLBACK: " + sof);
	if (sof === "33"){
		//Mojo.Controller.errorDialog("Backup did not complete.", this.controller.window);
		this.backupRestoreDialog("BACKUP-FAILURE");
		return;
	}
	var gameData;
	gameData =	wildnGameSettings.wgMoney + "," + wildnGameSettings.wgBet + "," + 
				wildnGameSettings.wgRankLevel + "," + wildnGameSettings.bgMoney + ","
				+ wildnGameSettings.bgBet + "," + wildnGameSettings.bgRankLevel;
	villo.common.set({
		title : "gameData",
		data : gameData,
		callback: this.backupCallback2.bind(this)
	});
};
MenuAssistant.prototype.backupCallback2 = function(sof) {
	console.log("CALLBACK: " + sof);
	if (sof === "33"){
		//Mojo.Controller.errorDialog("Backup did not complete.", this.controller.window);
		this.backupRestoreDialog("BACKUP-FAILURE");
		return;
	}
	//Mojo.Controller.errorDialog("Backup success!", this.controller.window);
	this.backupRestoreDialog("BACKUP-SUCCESS");
};
MenuAssistant.prototype.warnRestore = function(event){
	var i = backupRestore.length - 1;
	do {
		document.getElementById(backupRestore[i]).style.visibility = "hidden";
	} while (i--);
	document.getElementById("warnRestore").style.visibility = "visible";
	document.getElementById("startRestore").style.visibility = "visible";
	document.getElementById("cancel").style.visibility = "visible";
};
MenuAssistant.prototype.startRestore = function(event){
	document.getElementById("warnRestore").style.visibility = "hidden";
	document.getElementById("startRestore").style.visibility = "hidden";
	document.getElementById("cancel").style.visibility = "hidden";
	villo.common.get({
		title : "stats",
		callback: this.restoreCallback1.bind(this)
	});
};
MenuAssistant.prototype.restoreCallback1 = function(sof) {
	console.log("CALLBACK: " + sof);
	if (sof === "33"){
		//Mojo.Controller.errorDialog("Restore did not complete.", this.controller.window);
		this.backupRestoreDialog("RESTORE-FAILURE");
		return;
	}
	var wgTmp = JSON.parse(JSON.parse(sof).storage);
	if(wgTmp.length < 75){
		this.backupRestoreDialog("RESTORE-FAILURE");
		return;
	}
	for(x in wgTmp){
		wgStats[x] = parseInt(wgTmp[x]);
	};
	this.saveRetrievedStats();
	villo.common.get({
		title : "gameData",
		callback: this.restoreCallback2.bind(this)
	});
};
MenuAssistant.prototype.restoreCallback2 = function(sof) {
	console.log("CALLBACK: " + sof);
	if (sof === "33"){
		//Mojo.Controller.errorDialog("Restore did not complete.", this.controller.window);
		this.backupRestoreDialog("RESTORE-FAILURE");
		return;
	}
	var gameData = JSON.parse("[" + JSON.parse(sof).storage + "]");
	for (var gameDataIndex in gameData){
		gameData[gameDataIndex] = parseInt(gameData[gameDataIndex]);
	};
	stage.saveRetrievedGameData(gameData);
	//Mojo.Controller.errorDialog("Stats and game data successfully restored!", this.controller.window);
	this.backupRestoreDialog("RESTORE-SUCCESS");
};
MenuAssistant.prototype.backupRestoreDialog = function(dialog) {
	document.getElementById("backupRestoreDiv").innerHTML = '<img alt="" id="backupRestoreDialog" class="fullScreen" style="visibility:visible;margin-left:' + horizontalMargin + 'px;" src="images/menu/villo/OPTIONS/' + dialog + '.png" />';
	if (doScale){
		scale(["backupRestoreDialog"]);
	}
	menuStatus = "villoOptions";
	window.setTimeout(function(){
		swapScene("menu");
	}, 2450);
};
MenuAssistant.prototype.register = function(event, doRegister) {
	switch (isVilloOpen) {
		case true:
			//var stageController = Mojo.Controller.appController.getStageController("villoportal");
			//stageController.window.focus();
			break;
		case false:
			didOpenVillo = true;
			swapScene("login", doRegister);
			//launchVilloPortal(doRegister);
			break;
	}
	//!didLogIn ? swapScene("login") :  swapScene("chatroom");
};
MenuAssistant.prototype.skyLounge = function() {
	swapScene("sky");
	return;
	
	
	
	if(!didLogIn && didOpenVillo) {
		activateLogin();
		return;
	}
	switch(didOpenVillo) {
		case false:
			isSkyChatOpen = true;
			launchVilloPortal("skylounge");
			break;
		case true:
			launchSkyLounge();
			break;
	}
};
MenuAssistant.prototype.oceanLounge = function() {
	swapScene("ocean");
	return;
	
	
	if(!didLogIn && didOpenVillo) {
		activateLogin();
		return;
	}
	switch(didOpenVillo) {
		case false:
			isOceanChatOpen = true;
			launchVilloPortal("oceanlounge");
			break;
		case true:
			launchOceanLounge();
			break;
	}
};
MenuAssistant.prototype.leaderboards = function() {
	swapScene("leaderboards");
	return;
	
	
	if(!didLogIn && didOpenVillo) {
		activateLogin();
		return;
	}
	switch(didOpenVillo) {
		case false:
			isLeaderboardsOpen = true;
			launchVilloPortal("leaderboards");
			break;
		case true:
			launchLeaderboards();
			break;
	}
};
MenuAssistant.prototype.resetEverything = function(){
	console.log("resetting everything");
	wgRankLevel = 1;
	bgRankLevel = 1;
	console.log(wildnGameSettings.bgRankLevel);
	stage.saveOptions();
	playingWildnGame = false;
	stage.createNewGame();
	playingWildnGame = true;
	stage.createNewGame();
	for(var x = 0; x <= 75; x++){
		wgStats[x] = 0;
	}
	this.saveRetrievedStats();
}
MenuAssistant.prototype.showRanks = function() {
	var thisRank;
	if(playingWildnGame) {
		thisRank = wgRankLevel;
	} else {
		thisRank = bgRankLevel;
	}
	if(thisRank == 0){
		this.resetEverything();
		thisRank = 1;
	}
	var nextRank = rankList[thisRank];
	var rankLoop = 2;
	var xMod = 0;
	if(nextRank < 999) {
		xMod = 20;
	}
	if(nextRank > 999 && nextRank < 9999) {
		xMod = 10;
	}
	document.getElementById("next").style.left = 355 + xMod + "px";
	divNumber = 0;
	do {
		var item = 0;
		switch (rankLoop) {
			case 1:
				item = thisRank;
				break;
			case 2:
				item = nextRank;
				break;
		}
		item = item + "";
		var itemLength = item.length;
		do {
			i = itemLength - 1;
			var number = item[i];
			var left;
			switch (rankLoop) {
				case 1:
					left = 67 + 10 * i;
					break;
				case 2:
					left = 421 + 10 * i;
					break;
			}
			if(rankLoop == 2) {
				left = left + xMod;
			}
			var distance = left + horizontalMargin;
			var innerString = '<img alt="" id="rank' + divNumber + '" src="images/menu/numbers/' + number + '.png" style="margin-top:' + verticalMargin + 'px; top:300px; left:' + distance + 'px; width:17px; height:17px; position:fixed;">';
			document.getElementById("r" + divNumber).innerHTML = innerString;
			document.getElementById("r" + divNumber).style.visibility = "visible";
			divNumber++;
		} while (--itemLength);
	} while (--rankLoop);
	var rankSubMenuArray;
	if(doScale) {
		rankSubMenuArray = new Array(divNumber);
		for(var x = 0; x < divNumber; x++) {
			rankSubMenuArray[x] = "rank" + x;
		}
		scale(rankSubMenuArray);
		scale(["next"], false, false, true, false);
	}
	if(horizontalMargin){
		for(x=0;x<rankSubMenuArray.length;x++){
			document.getElementById(rankSubMenuArray[x]).style.marginLeft = + horizontalMargin + 'px';
		}
	}
};
MenuAssistant.prototype.saveRetrievedStats = function(){
	console.log("Saving Retrieved Stats..");
	
	wildnGameStats.bgRYF = wgStats[3];
	wildnGameStats.ATbgRYF = wgStats[17] - wgStats[3];
	wildnGameStats.bgSTF = wgStats[4];
	wildnGameStats.ATbgSTF = wgStats[18] - wgStats[4];
	wildnGameStats.bgST = wgStats[8];
	wildnGameStats.ATbgST = wgStats[22] - wgStats[8];
	wildnGameStats.bgFL = wgStats[7];
	wildnGameStats.ATbgFL = wgStats[21] - wgStats[7];
	wildnGameStats.bgFOAK = wgStats[5];
	wildnGameStats.ATbgFOAK = wgStats[19] - wgStats[5];
	wildnGameStats.bgFH = wgStats[6];
	wildnGameStats.ATbgFH = wgStats[20] - wgStats[6];
	wildnGameStats.bgTOAK = wgStats[9];
	wildnGameStats.ATbgTOAK = wgStats[23] - wgStats[9];
	wildnGameStats.bgTP = wgStats[10];
	wildnGameStats.ATbgTP = wgStats[24] - wgStats[10];
	wildnGameStats.bgJOB = wgStats[11];
	wildnGameStats.ATbgJOB = wgStats[25] - wgStats[11];
	wildnGameStats.bgTotalEarnings = wgStats[1];
	wildnGameStats.ATbgTotalEarnings = wgStats[15] - wgStats[1];
	wildnGameStats.bgHandsWon = wgStats[2];
	wildnGameStats.ATbgHandsWon = wgStats[16] - wgStats[2];
	wildnGameStats.bgTotalLosses = wgStats[12];
	wildnGameStats.ATbgTotalLosses = wgStats[26] - wgStats[12];
	wildnGameStats.bgHandsLost = wgStats[13];
	wildnGameStats.ATbgHandsLost = wgStats[27] - wgStats[13];
	wildnGameStats.bgHandsPlayed = wgStats[0];
	wildnGameStats.ATbgHandsPlayed = wgStats[14] - wgStats[0];
	
	wildnGameStats.wgRYF = wgStats[31];
	wildnGameStats.ATwgRYF = wgStats[55] - wgStats[31];
	wildnGameStats.wgSTF = wgStats[32];
	wildnGameStats.ATwgSTF = wgStats[56] - wgStats[32];
	wildnGameStats.wgWSTF = wgStats[45];
	wildnGameStats.ATwgWSTF = wgStats[69] - wgStats[69];
	wildnGameStats.wgST = wgStats[36];
	wildnGameStats.ATwgST = wgStats[60] - wgStats[36];
	wildnGameStats.wgWST = wgStats[49];
	wildnGameStats.ATwgWST = wgStats[73] - wgStats[49];
	wildnGameStats.wgFL = wgStats[35];
	wildnGameStats.ATwgFL = wgStats[59] - wgStats[35];
	wildnGameStats.wgWFL = wgStats[43];
	wildnGameStats.ATwgWFL = wgStats[67] - wgStats[43];
	wildnGameStats.wgFOAK = wgStats[33];
	wildnGameStats.ATwgFOAK = wgStats[57] - wgStats[33];
	wildnGameStats.wgWFOAK = wgStats[46];
	wildnGameStats.ATwgWFOAK = wgStats[70] - wgStats[46];
	wildnGameStats.wgFH = wgStats[34];
	wildnGameStats.ATwgFH = wgStats[58] - wgStats[34];
	wildnGameStats.wgWFH = wgStats[47];
	wildnGameStats.ATwgWFH = wgStats[71] - wgStats[47];
	wildnGameStats.wgTOAK = wgStats[37];
	wildnGameStats.ATwgTOAK = wgStats[61] - wgStats[37];
	wildnGameStats.wgWTOAK = wgStats[50];
	wildnGameStats.ATwgWTOAK = wgStats[74] - wgStats[50];
	wildnGameStats.wgTP = wgStats[38];
	wildnGameStats.ATwgTP = wgStats[62] - wgStats[38];
	wildnGameStats.wgJOB = wgStats[39];
	wildnGameStats.ATwgJOB = wgStats[63] - wgStats[39];
	wildnGameStats.wgWFL = wgStats[43];
	wildnGameStats.ATwgWFL = wgStats[67] - wgStats[43];
	wildnGameStats.wgWF = wgStats[48];
	wildnGameStats.ATwgWF = wgStats[72] - wgStats[48];
	wildnGameStats.wgWP = wgStats[51];
	wildnGameStats.ATwgWP = wgStats[75] - wgStats[51];
	wildnGameStats.wgFWC = wgStats[42];
	wildnGameStats.ATwgFWC = wgStats[66] - wgStats[42];
	wildnGameStats.wgFVAK = wgStats[44];
	wildnGameStats.ATwgFVAK = wgStats[68] - wgStats[44];
	wildnGameStats.wgTotalEarnings = wgStats[29];
	wildnGameStats.ATwgTotalEarnings = wgStats[53] - wgStats[29];
	wildnGameStats.wgHandsWon = wgStats[30];
	wildnGameStats.ATwgHandsWon = wgStats[54] - wgStats[30];
	wildnGameStats.wgTotalLosses = wgStats[40];
	wildnGameStats.ATwgTotalLosses = wgStats[64] - wgStats[40];
	wildnGameStats.wgHandsLost = wgStats[41];
	wildnGameStats.ATwgHandsLost = wgStats[65] - wgStats[41];
	wildnGameStats.wgHandsPlayed = wgStats[28];
	wildnGameStats.ATwgHandsPlayed = wgStats[52] - wgStats[28];
	localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
	//cupcake.updateCupcake('wildnGameStats', wildnGameStats);
};
