scenes = ["load", "menu", "stats", "wildngame", "login", "skyLounge", "oceanLounge", "leaderboards"];

function swapScene(scene, args) {
	if(deviceType == "Android"){Android.blur();}
	console.log('swapping scenes... ' + scene);
	if(args == null) {
		args = false
	}
	switch(currentScene) {
		case "load":
			document.getElementById("load-scene").innerHTML = "";
			for(var sc = 0; sc < scenes.length; sc++) {
				document.getElementById(scenes[sc] + "-scene").style.display = '';
			}
			setup();
			for(var sc = 0; sc < scenes.length; sc++) {
				document.getElementById(scenes[sc] + "-scene").style.display = 'none';
			}
			document.getElementById("menu-scene").style.display = '';
			return;
			break;
		case "menu":
			var menuListArray = ["wildnGame", "basicGame", "options", "villo", "exit", "resume", "startNew", "payouts", "stats", "back", "BET", "yes", "no", "resumeBet", "minus", "plus", "autoDeal", "sound", "themes", "help", "how-to-play", "what-wins", "about-villo", "about", "tapPayouts", "cardPrevious", "cardNext", "backdropPrevious", "backdropNext", "themesBack", "showNew", "villoRegisterYes", "villoRegisterNo", "skyLounge", "oceanLounge", "leaderboards", "villoOptions", "backupRestore", "backup", "restore", "startBackup", "startRestore", "cancel", "nextTutorial", "villoURL", "villoTWITTER", "webosworldURL", "webosworldTWITTER", "email", "twitter", "skip", "vnotifications"];
			for( x = 0; x < menuObjectArray.length; x++) {
				document.getElementById(menuObjectArray[x]).style.visibility = "hidden";
			}
			for( x = 0; x <= 7; x++) {
				document.getElementById("r" + x).style.visibility = "hidden";
			}
			document.getElementById("tutorialDiv").innerHTML = "";
			document.getElementById("backupRestoreDiv").innerHTML = "";
			document.getElementById("autoDealStatusDiv").innerHTML = "";
			document.getElementById("soundStatusDiv").innerHTML = "";
			document.getElementById("vnotificationsStatusDiv").innerHTML = "";
			document.getElementById("showCardDiv").innerHTML = "";
			MenuAssistant.prototype.deactivate();
			break;
		case "stats":
			StatsAssistant.prototype.deactivate();
			break;
		case "wildngame":
			WildngameAssistant.prototype.deactivate();
			break;
		case "login":
			LoginAssistant.prototype.deactivate();
			if(didLogIn) {
				document.getElementById("login-scene").innerHTML = "";
			}
			break;
		case "ocean":
			OceanloungeAssistant.prototype.deactivate();
			break;
		case "sky":
			SkyloungeAssistant.prototype.deactivate();
			break;
		case "leaderboards":
			LeaderboardsAssistant.prototype.deactivate();
			break;
	}
	for (x in scenes){
		document.getElementById(scenes[x] + "-scene").style.display = "none";
	}
	switch(scene) {
		case "menu":
			document.getElementById("menu-scene").style.display = '';
			MenuAssistant.prototype.activate(args);
			break;
		case "stats":
			document.getElementById("menu-scene").style.display = '';
			document.getElementById("stats-scene").style.display = '';
			StatsAssistant.prototype.activate(args);
			break;
		case "wildngame":
			document.getElementById("wildngame-scene").style.display = '';
			WildngameAssistant.prototype.activate(args);
			break;
		case "login":
			document.getElementById("login-scene").style.display = '';
			LoginAssistant.prototype.activate(args);
			if(deviceType == "Android"){Android.focus();}
			break;
		case "ocean":
			document.getElementById("oceanLounge-scene").style.display = '';
			OceanloungeAssistant.prototype.activate(args);
			if(deviceType == "Android"){Android.focus();}
			break;
		case "sky":
			document.getElementById("skyLounge-scene").style.display = '';
			SkyloungeAssistant.prototype.activate(args);
			if(deviceType == "Android"){Android.focus();}
			break;
		case "leaderboards":
			document.getElementById("leaderboards-scene").style.display = '';
			LeaderboardsAssistant.prototype.activate();
			break;
	}
}
function goBack() {
	switch(currentScene) {
			case "menu":
				MenuAssistant.prototype.back();
				break;
			case "stats":
				StatsAssistant.prototype.back();
				break;
			case "wildngame":
				WildngameAssistant.prototype.back();
				break;
			case "login":
				LoginAssistant.prototype.back();
				break;
			case "ocean":
				OceanloungeAssistant.prototype.back();
				break;
			case "sky":
				SkyloungeAssistant.prototype.back();
				break;
			case "leaderboards":
				LeaderboardsAssistant.prototype.back();
				break;
		}
}