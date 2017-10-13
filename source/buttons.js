function activateButtons() {
	lastID = "";
	downEvent = "mousedown";
	upEvent = "mouseup";
	if( typeof document.body.ontouchstart != "undefined" && deviceType != "webOS") {
		downEvent = "touchstart";
		upEvent = "touchend";
	}
	buttonHold_ = buttonHold.bind(this);
	buttonRelease_ = buttonRelease.bind(this);
	buttonOver_ = buttonOver.bind(this);
	buttonOut_ = buttonOut.bind(this);
	//menuButtonTap_ = menuButtonTap.bind(this);

	var menuListArray = ["wildnGame", "basicGame", "options", "villo", "exit", "resume", 
	"startNew", "payouts", "stats", "back", "BET", "yes", "no", "resumeBet", "minus", "plus", 
	"autoDeal", "sound", "themes", "help", "how-to-play", "what-wins", "about-villo", "about", 
	"tapPayouts", "cardPrevious", "cardNext", "backdropPrevious", "backdropNext", "themesBack", 
	"showNew", "villoRegisterYes", "villoRegisterNo", "skyLounge", "oceanLounge", "leaderboards", 
	"villoOptions", "backupRestore", "backup", "restore", "startBackup", "startRestore", "cancel", 
	"nextTutorial", "villoURL", "villoTWITTER", "webosworldURL", "webosworldTWITTER", "email", "twitter", 
	"skip", "vnotifications", "wildntwitter"];
	var oceanArray = ["oceanBack"];
	var skyArray = ["skyBack"];
	var buttons = ["leadersBack", "nextLeaderboard", "lastLeaderboard", "submitZone"];
	var listenForButtons = [];
	var loginListArray = ["loginBtn", "doRegister", "registerBtn", "villoBack"];
	listenForButtons = listenForButtons.concat(menuListArray, loginListArray, oceanArray, skyArray, buttons);

	for(i in listenForButtons) {
		var element = document.getElementById(listenForButtons[i]);
		element.addEventListener(downEvent, buttonHold_.bind(this));
		element.addEventListener(upEvent, buttonRelease_.bind(this));
		element.addEventListener("mouseover", buttonOver_.bind(this));
		element.addEventListener("mouseout", buttonOut_.bind(this));
		//element.addEventListener( "click", menuButtonTap.bind(this));
	}
}

function buttonHold(e) {
	var targetID = e.target.id;
	lastID = targetID;
	document.getElementById(targetID).style.opacity = ".5";
}

function buttonRelease(e) {
	var targetID = e.target.id;
	if(lastID == targetID) {
		document.getElementById(targetID).style.opacity = "1";
		menuButtonTap(e);
	} else {
		document.getElementById(lastID).style.opacity = "1";
	}
	lastID = "";
}

function buttonOver(e) {
	var targetID = e.target.id;
	if(targetID == lastID) {
		document.getElementById(targetID).style.opacity = ".5";
	}
}

function buttonOut(e) {
	var targetID = e.target.id;
	document.getElementById(targetID).style.opacity = "1";
}

function menuButtonTap(e) {
	var ot;
	var targetID = e.target.id;
	document.getElementById(targetID).style.opacity = ".5";
	if(targetID == "submitZone") {
		targetID = "submitNew"
	}
	switch(targetID) {
		case "themes":
		case "villoOptions":
		case "payouts":
		case "options":
		case "help":
			menuStatus = targetID;
		case "cancel":
			swapScene("menu");
			break;
		case "startNew":
			menuStatus = "areYouSure";
			swapScene("menu");
			break;
		case "yes":
			stage.createNewGame();
			menuStatus = "sub";
			swapScene("wildngame");
			break;
		case "no":
			menuStatus = "sub";
			swapScene("menu");
			break;
		case "stats":
			swapScene("stats");
			break;
		case "villoRegisterYes":
			delete freshInstall;
			menuStatus = "villo";
			var doRegister = "register";
			MenuAssistant.prototype.register(null, doRegister);
			break;
		case "villoRegisterNo":
			delete freshInstall;
			menuStatus = "main";
			swapScene("menu");
			break;
		case "exit":
			switch(deviceType) {
				case "iOS":
					document.location = "wildnpoker:" + "exit:";
					break;
				case "Android":
					Android.exit();
					break;
				default:
					window.open('', '_self', '');
					window.close();
					break;
			}
			break;
		case "themesBack":
			wildnGameSettings.cardBack = cardBack;
			wildnGameSettings.gameBack = gameBack;
			stage.saveOptions();
			menuStatus = "options";
			swapScene("menu");
			break;
		case "resume":
			swapScene("wildngame");
			break;
		case "tapPayouts":
			window.clearTimeout(pOt);
			menuStatus = "sub";
			swapScene("menu");
			break;
		case "back":
			MenuAssistant.prototype.back();
			break;
		case "basicGame":
			MenuAssistant.prototype.basicGame();
			break;
		case "wildnGame":
			MenuAssistant.prototype.wildnGame();
			break;
		case "BET":
			menuStatus = "bet";
			MenuAssistant.prototype.bet();
			break;
		case "resumeBet":
			MenuAssistant.prototype.resumeBet();
			break;
		case "showNew":
			MenuAssistant.prototype.welcome();
			break;
		case "villo":
			switch(didLogIn) {
				case true:
					menuStatus = "villo";
					swapScene("menu");
					break;
				case false:
					swapScene("login");
					break;
			}
			break;
		case "skyLounge":
			MenuAssistant.prototype.skyLounge();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "oceanLounge":
			MenuAssistant.prototype.oceanLounge();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "leaderboards":
			MenuAssistant.prototype.leaderboards();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "backupRestore":
			if(!didLogIn) {
				//Mojo.Controller.errorDialog("You must be logged into Villo to perform this action.", MenuAssistant.prototype.controller.window);
				return;
			}
			menuStatus = "backupRestore";
			swapScene("menu");
			break;
		case "backup":
			MenuAssistant.prototype.warnBackup();
			break;
		case "restore":
			MenuAssistant.prototype.warnRestore();
			break;
		case "startBackup":
			MenuAssistant.prototype.startBackup();
			break;
		case "startRestore":
			MenuAssistant.prototype.startRestore();
			break;
		case "cancel":
			MenuAssistant.prototype.cancel();
			break;
		case "sound":
		case "soundStatus":
			MenuAssistant.prototype.sound();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "autoDeal":
		case "autoDealStatus":
			MenuAssistant.prototype.autoDeal();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "backdropPrevious":
			MenuAssistant.prototype.previousBackdrop();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "backdropNext":
			MenuAssistant.prototype.nextBackdrop();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "cardPrevious":
			MenuAssistant.prototype.previousCard();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "cardNext":
			MenuAssistant.prototype.nextCard();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "plus":
			bet = bet + minBet;
			MenuAssistant.prototype.showMenus();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "minus":
			bet = bet - minBet;
			MenuAssistant.prototype.showMenus();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "how-to-play":
			menuStatus = "tutorial";
			tutorialType = "howToPlay";
			numTutorialSections = 8;
			tutorialStatus = 0;
			swapScene("menu");
			break;
		case "about-villo":
			menuStatus = "tutorial";
			tutorialType = "villo";
			numTutorialSections = 7;
			tutorialStatus = 0;
			swapScene("menu");
			break;
		case "about":
			menuStatus = "tutorial";
			tutorialType = "about";
			numTutorialSections = 1;
			tutorialStatus = 0;
			swapScene("menu");
			break;
		case "what-wins":
			menuStatus = "tutorial";
			tutorialType = "whatWins";
			numTutorialSections = 7;
			tutorialStatus = 0;
			swapScene("menu");
			break;
		case "nextTutorial":
			if(tutorialStatus == numTutorialSections) {
				tutorialStatus = 0;
				if(isInTutorial) {
					window.clearTimeout(pOt);
					MenuAssistant.prototype.continueTutorial();
					return;
				}
				menuStatus = "help";
			}
			window.clearTimeout(pOt);
			swapScene("menu");
			break;
		case "villoURL":
		case "villoTWITTER":
		case "webosworldURL":
		case "webosworldTWITTER":
		case "wildntwitter":
		case "twitter":
			MenuAssistant.prototype.openInBrowser(targetID);
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "email":
			MenuAssistant.prototype.openEmail();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "skip":
			document.getElementById("tutorialDiv").innerHTML = "";
			if( typeof (freshInstall) != "undefined") {
				MenuAssistant.prototype.welcome();
				return;
			}
			menuStatus = "help";
			window.clearTimeout(pOt);
			swapScene("menu");
			break;
		case "vnotifications":
		case "vnotificationsStatus":
			MenuAssistant.prototype.vnotifications();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "loginBtn":
			LoginAssistant.prototype.loginTry();
			break;
		case "doRegister":
			LoginAssistant.prototype.registerTry();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "registerBtn":
			LoginAssistant.prototype.switchLayout();
			ot = window.setTimeout(function() {
				document.getElementById(targetID).style.opacity = "1"
			}, 100);
			break;
		case "oceanBack":
			OceanloungeAssistant.prototype.back();
			break;
		case "skyBack":
			SkyloungeAssistant.prototype.back();
			break;
		case "leadersBack":
			LeaderboardsAssistant.prototype.back();
			break;
		case "submitNew":
			LeaderboardsAssistant.prototype.submitScore();
			break;
		case "nextLeaderboard":
			LeaderboardsAssistant.prototype.nextLeaderboard();
			break;
		case "lastLeaderboard":
			LeaderboardsAssistant.prototype.lastLeaderboard();
			break;
	}
	if(!ot) {
		document.getElementById(targetID).style.opacity = "1";
	}
};