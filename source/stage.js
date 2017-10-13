
/*
 * 
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 * 
 */

function StageAssistant() {
	this.createNewGame = function(){
		this.cookie = new wildnGameCookie();
		this.cookie.initialize();
		console.log("Creating New Game..");
		if (playingWildnGame){
			wildnGameSettings.wgMoney = minBet*10;
			wildnGameSettings.wgBet = minBet;
				wildnGameStats.ATwgHandsPlayed = wildnGameStats.ATwgHandsPlayed + wildnGameStats.wgHandsPlayed;
				wildnGameStats.ATwgTotalEarnings = wildnGameStats.ATwgTotalEarnings + wildnGameStats.wgTotalEarnings;
				wildnGameStats.ATwgHandsWon = wildnGameStats.ATwgHandsWon + wildnGameStats.wgHandsWon;
				wildnGameStats.ATwgRYF = wildnGameStats.ATwgRYF + wildnGameStats.wgRYF;
				wildnGameStats.ATwgSTF = wildnGameStats.ATwgSTF + wildnGameStats.wgSTF;
				wildnGameStats.ATwgFOAK = wildnGameStats.ATwgFOAK +  wildnGameStats.wgFOAK;
				wildnGameStats.ATwgFH = wildnGameStats.ATwgFH + wildnGameStats.wgFH;
				wildnGameStats.ATwgFL = wildnGameStats.ATwgFL + wildnGameStats.wgFL;
				wildnGameStats.ATwgST = wildnGameStats.ATwgST + wildnGameStats.wgST;
				wildnGameStats.ATwgTOAK = wildnGameStats.ATwgTOAK + wildnGameStats.wgTOAK;
				wildnGameStats.ATwgTP = wildnGameStats.ATwgTP + wildnGameStats.wgTP;
				wildnGameStats.ATwgJOB = wildnGameStats.ATwgJOB + wildnGameStats.wgJOB;
				wildnGameStats.ATwgTotalLosses = wildnGameStats.ATwgTotalLosses + wildnGameStats.wgTotalLosses;
				wildnGameStats.ATwgHandsLost = wildnGameStats.ATwgHandsLost + wildnGameStats.wgHandsLost;
				wildnGameStats.ATwgFWC = wildnGameStats.ATwgFWC + wildnGameStats.wgFWC;
				wildnGameStats.ATwgWFL = wildnGameStats.ATwgWFL + wildnGameStats.wgWFL;
				wildnGameStats.ATwgFVAK = wildnGameStats.ATwgFVAK + wildnGameStats.wgFVAK;
				wildnGameStats.ATwgWSTF = wildnGameStats.ATwgWSTF + wildnGameStats.wgWSTF;
				wildnGameStats.ATwgWFOAK = wildnGameStats.ATwgWFOAK + wildnGameStats.wgWFOAK;
				wildnGameStats.ATwgWFH = wildnGameStats.ATwgWFH + wildnGameStats.wgWFH;
				wildnGameStats.ATwgWF = wildnGameStats.ATwgWF + wildnGameStats.wgWF;
				wildnGameStats.ATwgWST = wildnGameStats.ATwgWST + wildnGameStats.wgWST;
				wildnGameStats.ATwgWTOAK = wildnGameStats.ATwgWTOAK + wildnGameStats.wgWTOAK;
				wildnGameStats.ATwgWP = wildnGameStats.ATwgWP + wildnGameStats.wgWP;
			wildnGameStats.wgHandsPlayed = 0;
			wildnGameStats.wgTotalEarnings = 0;
			wildnGameStats.wgHandsWon = 0;
			wildnGameStats.wgRYF = 0;
			wildnGameStats.wgSTF = 0;
			wildnGameStats.wgFOAK = 0;
			wildnGameStats.wgFH = 0;
			wildnGameStats.wgFL = 0;
			wildnGameStats.wgST = 0;
			wildnGameStats.wgTOAK = 0;
			wildnGameStats.wgTP = 0;
			wildnGameStats.wgJOB = 0;
			wildnGameStats.wgTotalLosses = 0;
			wildnGameStats.wgHandsLost = 0;
			wildnGameStats.wgFWC = 0;
			wildnGameStats.wgWFL = 0;
			wildnGameStats.wgFVAK = 0;
			wildnGameStats.wgWSTF = 0;
			wildnGameStats.wgWFOAK = 0;
			wildnGameStats.wgWFH = 0;
			wildnGameStats.wgWF = 0;
			wildnGameStats.wgWST = 0;
			wildnGameStats.wgWTOAK = 0;
			wildnGameStats.wgWP = 0;
			for(var x = 28; x < 52; x++){
				wgStats[x] = 0;
			}
		} else {
			wildnGameSettings.bgMoney = minBet*10;
			wildnGameSettings.bgBet = minBet;
				wildnGameStats.ATbgHandsPlayed = wildnGameStats.ATbgHandsPlayed + wildnGameStats.bgHandsPlayed;
				wildnGameStats.ATbgTotalEarnings = wildnGameStats.ATbgTotalEarnings + wildnGameStats.bgTotalEarnings;
				wildnGameStats.ATbgHandsWon = wildnGameStats.ATbgHandsWon + wildnGameStats.bgHandsWon;
				wildnGameStats.ATbgRYF = wildnGameStats.ATbgRYF + wildnGameStats.bgRYF;
				wildnGameStats.ATbgSTF = wildnGameStats.ATbgSTF + wildnGameStats.bgSTF;
				wildnGameStats.ATbgFOAK = wildnGameStats.ATbgFOAK + wildnGameStats.bgFOAK;
				wildnGameStats.ATbgFH = wildnGameStats.ATbgFH + wildnGameStats.bgFH;
				wildnGameStats.ATbgFL = wildnGameStats.ATbgFL + wildnGameStats.bgFL;
				wildnGameStats.ATbgST = wildnGameStats.ATbgST + wildnGameStats.bgST;
				wildnGameStats.ATbgTOAK = wildnGameStats.ATbgTOAK + wildnGameStats.bgTOAK;
				wildnGameStats.ATbgTP = wildnGameStats.ATbgTP + wildnGameStats.bgTP;
				wildnGameStats.ATbgJOB = wildnGameStats.ATbgJOB + wildnGameStats.bgJOB;
				wildnGameStats.ATbgTotalLosses = wildnGameStats.ATbgTotalLosses + wildnGameStats.bgTotalLosses;
				wildnGameStats.ATbgHandsLost = wildnGameStats.ATbgHandsLost + wildnGameStats.bgHandsLost;
			wildnGameStats.bgHandsPlayed = 0;
			wildnGameStats.bgTotalEarnings = 0;
			wildnGameStats.bgHandsWon = 0;
			wildnGameStats.bgRYF = 0;
			wildnGameStats.bgSTF = 0;
			wildnGameStats.bgFOAK = 0;
			wildnGameStats.bgFH = 0;
			wildnGameStats.bgFL = 0;
			wildnGameStats.bgST = 0;
			wildnGameStats.bgTOAK = 0;
			wildnGameStats.bgTP = 0;
			wildnGameStats.bgJOB = 0;
			wildnGameStats.bgTotalLosses = 0;
			wildnGameStats.bgHandsLost = 0;
			for(var x = 0; x < 14; x++){
				wgStats[x] = 0;
			}
		};
		wildnGameSettings.resumePause = false;
		this.cookie.storeCookie();
		localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
		//cupcake.updateCupcake('wildnGameStats', wildnGameStats);
	};
	this.saveGame = function(){
		this.cookie = new wildnGameCookie();
		this.cookie.initialize();
		console.log("Saving Game..");
		if (playingWildnGame) {
			wildnGameSettings.wgMoney = money;
			wildnGameSettings.wgBet = bet;
			wildnGameSettings.wild = wild;
		} else {
			wildnGameSettings.bgMoney = money;
			wildnGameSettings.bgBet = bet;
		}
		wildnGameSettings.resumePause = true;
		wildnGameSettings.cardSuit1 = cardSuit[0];
		wildnGameSettings.cardSuit2 = cardSuit[1];
		wildnGameSettings.cardSuit3 = cardSuit[2];
		wildnGameSettings.cardSuit4 = cardSuit[3];
		wildnGameSettings.cardSuit5 = cardSuit[4];
		wildnGameSettings.cardNumber1 = cardNumber[0];
		wildnGameSettings.cardNumber2 = cardNumber[1];
		wildnGameSettings.cardNumber3 = cardNumber[2];
		wildnGameSettings.cardNumber4 = cardNumber[3];
		wildnGameSettings.cardNumber5 = cardNumber[4];
		wildnGameSettings.wgRankLevel = wgRankLevel;
		wildnGameSettings.bgRankLevel = bgRankLevel;
		wildnGameSettings.nextSubmission = nextSubmission;
		this.cookie.storeCookie();
	};
	this.saveOptions = function(){
		console.log("Saving Options..");
		this.cookie = new wildnGameCookie();
		this.cookie.initialize();
		wildnGameSettings.vsound = vsound;
		wildnGameSettings.vnotifications = vnotifications;
		wildnGameSettings.autoDeal = autoDeal;
		wildnGameSettings.sound = sound;
		wildnGameSettings.cardBack = cardBack;
		wildnGameSettings.gameBack = gameBack;
		wildnGameSettings.wgRankLevel = wgRankLevel;
		wildnGameSettings.bgRankLevel = bgRankLevel;
		wildnGameSettings.nextSubmission = nextSubmission;
		wildnGameSettings.didTutorial = didTutorial;
		this.cookie.storeCookie();
	};
	this.saveLoginInfo = function(){
		console.log("Saving Options..");
		this.cookie = new wildnGameCookie();
		this.cookie.initialize();
		wildnGameSettings.rememberLogin = rememberLogin;
		this.cookie.storeCookie();
	};
	this.saveRetrievedGameData = function(gameData){
		this.cookie = new wildnGameCookie();
		this.cookie.initialize();
		console.log("Saving Retrieved Game Data..");
		wildnGameSettings.wgMoney = gameData[0];
		wildnGameSettings.wgBet = gameData[1];
		wildnGameSettings.wgRankLevel = gameData[2];
		wildnGameSettings.bgMoney = gameData[3];
		wildnGameSettings.bgBet = gameData[4];
		wildnGameSettings.bgRankLevel = gameData[5];
		this.cookie.storeCookie();
		wgRankLevel = wildnGameSettings.wgRankLevel;
		bgRankLevel = wildnGameSettings.bgRankLevel;
	};
};

var stage = new StageAssistant();
wildnGameSettings = {};
wildnGameSettings.versionString = "1.8.0";
wildnGameSettings.resumePause = false;
wildnGameStats = {
	bgHandsPlayed : 0,
	bgTotalEarnings : 0,
	bgHandsWon : 0,
	bgRYF : 0,
	bgSTF : 0,
	bgFOAK : 0,
	bgFH : 0,
	bgFL : 0,
	bgST : 0,
	bgTOAK : 0,
	bgTP : 0,
	bgJOB : 0,
	bgTotalLosses : 0,
	bgHandsLost : 0,
	ATbgHandsPlayed : 0,
	ATbgTotalEarnings : 0,
	ATbgHandsWon : 0,
	ATbgRYF : 0,
	ATbgSTF : 0,
	ATbgFOAK : 0,
	ATbgFH : 0,
	ATbgFL : 0,
	ATbgST : 0,
	ATbgTOAK : 0,
	ATbgTP : 0,
	ATbgJOB : 0,
	ATbgTotalLosses : 0,
	ATbgHandsLost : 0,
	wgHandsPlayed : 0,
	wgTotalEarnings : 0,
	wgHandsWon : 0,
	wgRYF : 0,
	wgSTF : 0,
	wgFOAK : 0,
	wgFH : 0,
	wgFL : 0,
	wgST : 0,
	wgTOAK : 0,
	wgTP : 0,
	wgJOB : 0,
	wgTotalLosses : 0,
	wgHandsLost : 0,
	wgFWC : 0,
	wgWFL : 0,
	wgFVAK : 0,
	wgWSTF : 0,
	wgWFOAK : 0,
	wgWFH : 0,
	wgWF : 0,
	wgWST : 0,
	wgWTOAK : 0,
	wgWP : 0,
	ATwgHandsPlayed : 0,
	ATwgTotalEarnings : 0,
	ATwgHandsWon : 0,
	ATwgRYF : 0,
	ATwgSTF : 0,
	ATwgFOAK : 0,
	ATwgFH : 0,
	ATwgFL : 0,
	ATwgST : 0,
	ATwgTOAK : 0,
	ATwgTP : 0,
	ATwgJOB : 0,
	ATwgTotalLosses : 0,
	ATwgHandsLost : 0,
	ATwgFWC : 0,
	ATwgWFL : 0,
	ATwgFVAK : 0,
	ATwgWSTF : 0,
	ATwgWFOAK : 0,
	ATwgWFH : 0,
	ATwgWF : 0,
	ATwgWST : 0,
	ATwgWTOAK : 0,
	ATwgWP : 0
};

StageAssistant.prototype.setup = function() {
	var currentScore, wild, money, bet, resume, cardBack, cardNumber, cardSuit, cardNumber2, cardSuit2, checkStraight, difficulty, 
	flipState, holdState, flippedAll, item, itemIndex, itemLength, itemTop, allTime, percentages, dontAllow, toDeal, z, isPlaying1, 
	isPlaying2, audioURL, numFlashes, rankTier1, rankTier2, rankTier3, rankTier4, rankTier5, wgRankLevel, bgRankLevel, canSubmit, 
	nextSubmission, rememberLogin, scoreDigitLeft1, scoreDigitLeft2, scoreDigitLeft3, scoreDigitLeft4, scoreDigitLeft5, scoreDigitLeft6,
	canFlip, toDeal, isInverted, gameBack, autoDeal, vsound, vnotifications, tutorialType, numTutorialSections, didTutorial;
	//var

	loadStats = true;
	appInitiate = true;
	makeNew = false;
	isFlashing = false;
	cycleTry1 = false;
	cycleTry2 = false;
	logThis = false;
	playingWildnGame = false;
	rankUp = false;
	didLogIn = false;
	didOpenVillo = false;
	reActivateIcons = true;
	canSubmit = false;
	isLeaderboardsOpen = false;
	isOceanChatOpen = false;
	isSkyChatOpen = false;
	isLoginOpen = false;
	newUser = false;
	isVilloOpen = false;
	isInTutorial = false;
	
	msgs = [];
	msgs2 = [];
	
	window.innerWidth < 410 ? moveVertically = true : moveVertically = false;
	
	doScale = true;
	
	isPaid = true;
	
	//moveVertically = true;
	verticalMargin = moveVertically ? 30 : 0;
	
	speed = 35;
	minBet = 5;
	pWait = 0;
	difficulty = 3;
	nextChannel = 1;
	horizontalMargin = 0;
	scaleFactor = 1;
	menuStatus = "main";
	betStatus = "no";
	wgStats = new Array(75);
	menuObjectArray = new Array(0);
	canFlip = [0,0,0,0,0,0];
	numCardBacks = 45;
	numBackdrops = 44;
	tutorialStatus = 0;
	skyDash = oceanDash = 0;
	
	
	
	//28,000 * 40 + 125,000 * 3 * 40 === score of a level 40
	//16,120,000 -- projected score for a level 40
	rankTier1 = [0, 350, 400, 450, 500, 600, 700, 800, 900, 1000];
	//end at 6,000
	rankTier2 = [1100, 1200, 1300, 1400, 1500, 1600, 1750, 1900, 2050, 2200];
	//end at 22,000
	rankTier3 = [2400, 2600, 2800, 3000, 3200, 3400, 3700, 4000, 4300, 4600];
	//end at 56,000
	rankTier4 = [5000, 5400, 5800, 6200, 6600, 7000, 7500, 8000, 8500, 9000];
	//end at 125,000
	rankTier5 = [10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 65000];
	//end at 395,000

	rankList = new Array(0);
	rankList = rankList.concat(rankTier1, rankTier2, rankTier3, rankTier4, rankTier5);
	console.log(rankList);
	loadMenu = ["avatar", "preSplash", "load", "BLINK", "CONTINUE", "TAP", "mainMenuTitle"];
	mainMenu = ["wildnGame", "basicGame", "options", "villo", "exit"];
	if(isPaid){mainMenu.concat(["UPGRADE"])}
	subMenu = ["resume", "startNew", "payouts", "stats", "back", "rank", "next"];
	areYouSure = ["areYouSure", "yes", "no"];
	options = ["autoDeal", "sound", "themes", "help", "back"];
	help = ["how-to-play","what-wins","about-villo","about","back"];
	tutorial = ["nextTutorial","skip","villoURL","villoTWITTER","webosworldURL","webosworldTWITTER","email","twitter","wildntwitter"];
	themes = ["cardPrevious","cardNext","showShadow","backdropPrevious","backdropNext","themesBack"];
	payouts = ["tapPayouts", "wgPayoutsStatic", "wgPayoutsFlash", "bgPayoutsStatic", "bgPayoutsFlash"];
	welcome = ["showNew", "TTC", "clearGames"];
	villoMenu = ["skyLounge", "oceanLounge", "leaderboards","villoOptions","back", "villoLight"];
	villoOptions = ["backupRestore","back"];
	backupRestore = ["backup","restore","backupInfo","back"];
	var backupRestoreExtras = ["cancel","startBackup","startRestore","warnBackup","warnRestore"];
	statMenu = ["WGLAYOUT", "BGLAYOUT", "TAPZONE-LARGE", "RANKLG", "NEXTLG"];
	statsSmall = ["CURRENTnSMALL", "CURRENTpSMALL", "ALL-TIMEnSMALL", "ALL-TIMEpSMALL"];
	statsLarge = ["CURRENTnLARGE", "CURRENTpLARGE", "ALL-TIMEnLARGE", "ALL-TIMEpLARGE"];
	wildnGameObjects = ["divider", "deal", "wild", "winnerBar", "deal-bar"];
	var betMenu = ["BET", "changeBet", "resumeBet", "minus", "plus"];
	var villoRegMenu = ["villoRegister","villoRegisterYes","villoRegisterNo"];
	horizontalArray = ["card1contents","card2contents","card3contents","card4contents","card5contents"];
	menuObjectArray = menuObjectArray.concat(mainMenu, subMenu, areYouSure, options, help, themes, payouts, welcome, villoMenu, villoOptions, backupRestore, backupRestoreExtras, betMenu, villoRegMenu, tutorial);
	leaderboardsArray = ["nextLeaderboard", "lastLeaderboard", "all", "latest", "month", "today", "submitNew", "submitZone"];

	var x = randomInt(0, 215);
	var y = randomInt(0, 135);
	spades = new Array(x, y, -1, -1);
	x = randomInt(0, 215);
	y = randomInt(170, 250);
	hearts = new Array(x, y, -1, 1);
	x = randomInt(275, 410);
	y = randomInt(0, 135);
	diamonds = new Array(x, y, 1, -1);
	x = randomInt(275, 410);
	y = randomInt(170, 250);
	clubs = new Array(x, y, -1, -1);

	this.cookie = new wildnGameCookie();
	this.cookie.initialize();
	
	if(!('bind' in Function.prototype)) {
		Function.prototype.bind = (function() {
			var _slice = Array.prototype.slice;
			return function(context) {
				var fn = this, args = _slice.call(arguments, 1);
				if(args.length) {
					return function() {
						return arguments.length ? fn.apply(context, args.concat(_slice.call(arguments))) : fn.apply(context, args);
					}
				}
				return function() {
					return arguments.length ? fn.apply(context, arguments) : fn.call(context);
				};
			}
		})();
	}
	LoadAssistant.prototype.setup();
};
////////////////END SETUP.///////////////////
checkVilloStatus = function() {
	if(!isSkyChatOpen && !isOceanChatOpen && !isLeaderboardsOpen) {
		isVilloOpen = false;
	}
};
markAppForeground = function(callback) {
	var parameters = {};
	parameters.subscribe = true;
	parameters.foregroundApp = true;
	/*return new Mojo.Service.Request("palm://com.palm.audio/media", {
		method : 'lockVolumeKeys',
		onSuccess : callback,
		parameters : parameters
	});*/
};
function randomInt(min, max) { //returns a random integer value with min max arguments
	return Math.floor(Math.random() * ( max - min + 1)) + min;
};
function sortNumber(a, b) {
	return b - a;
};
function scale(elementArray, dimx, dimy, disx, disy, element, aspectRatio) {
	if( typeof (aspectRatio) === "undefined") {
		var aspectRatio = scaleFactor;
	}
	if( typeof (dimx) === "undefined") {
		var dimx = true;
	}
	if( typeof (dimy) === "undefined") {
		var dimy = true;
	}
	if( typeof (disx) === "undefined") {
		var disx = true;
	}
	if( typeof (disy) === "undefined") {
		var disy = true;
	}
	if( typeof (element) === "undefined") {
		var element = "img";
	}
	var objectWidth;
	var objectHeight;
	var objectLeft;
	var objectTop;
	var didBack = false;
	for (x = 0; x < elementArray.length; x++) {
		
		//THIS TO FIGURE OUT WHICH IS THE INCRIMINATING ELEMENT
		if(!didBack && elementArray[x] === "back") {
			didBack = true;
		} else if(didBack && elementArray[x] === "back") {
			x++;
		}
		
		try {
			if(dimx) {
				objectWidth = parseInt(document.getElementsByTagName(element)[elementArray[x]].offsetWidth);
				objectWidth = objectWidth / aspectRatio;
				document.getElementById(elementArray[x]).style.width = objectWidth + "px";
			}
			if(dimy) {
				objectHeight = parseInt(document.getElementsByTagName(element)[elementArray[x]].offsetHeight);
				objectHeight = objectHeight / aspectRatio;
				document.getElementById(elementArray[x]).style.height = objectHeight + "px";
			}
			if(disx) {
				objectLeft = parseInt(document.getElementsByTagName(element)[elementArray[x]].offsetLeft);
				objectLeft = Math.round(objectLeft / aspectRatio);
				document.getElementById(elementArray[x]).style.left = objectLeft + "px";
				//console.log(objectLeft);
			}
			if(disy) {
				objectTop = parseInt(document.getElementsByTagName(element)[elementArray[x]].offsetTop);
				objectTop = Math.round(objectTop / aspectRatio);
				document.getElementById(elementArray[x]).style.top = objectTop + "px";
				//console.log(objectTop);
			}
		} catch(e) {
			console.error("ELEMENT DOES NOT EXIST: " + elementArray[x]);
		}
	}
};
function wildnGameCookie(){
}
wildnGameCookie.prototype.initialize = function() {
	var loadGame = true;
	this.oldGame = localStorage["wildnGame"];
	
	if(!this.oldGame && deviceType == "webOS"){
		retreiveOldDatabase();
		this.oldGame = enyo.getCookie('mojo_cookie_wildnGame');
		//console.log("GETCOOKIE: " + JSON.stringify(this.oldGame));
	}
	if (this.oldGame){ //if cookie data exists..
		this.oldGame = this.oldGame.split(";")[0];
		console.log(this.oldGame);
		this.oldGame = JSON.parse(this.oldGame);
		if (typeof(this.oldGame.versionString) === "undefined"){
			this.oldGame.versionString = "1.8.0";
			freshInstall = true;
		}
		if (this.oldGame.versionString != wildnGameSettings.versionString){ //if the versions are not the same...
			//check to see which version it's running and update cookie data accordingly..
			var versionString = this.oldGame.versionString;
			console.log(this.oldGame.versionString)
			z = versionString[4];
			if (versionString[0]==="0"&&versionString[2]==="6"&&(z === "5")){
				console.log("VERSION CHANGE FROM " + versionString + " TO " + wildnGameSettings.versionString);
				wildnGameSettings.vsound = true;
				wildnGameSettings.vnotifications = true;
				wildnGameSettings.wgMoney = minBet*10;
				wildnGameSettings.bgMoney = minBet*10;
				wildnGameSettings.wgBet = minBet;
				wildnGameSettings.bgBet = minBet;
				wildnGameSettings.bgRankLevel = 0;
				wildnGameSettings.wgRankLevel = 0;
				wildnGameSettings.bgRankScore = 0;
				wildnGameSettings.wgRankScore = 0;
				wildnGameSettings.autoDeal = true;
				wildnGameSettings.sound = true;
				wildnGameSettings.cardBack = "back1";
				wildnGameSettings.gameBack = 1;
				wildnGameSettings.nextSubmission = 0;
				canSubmit = true;
				loadGame = false;
				wildnGameSettings.rememberLogin = false;
				wildnGameSettings.didTutorial = false;
			}
		}
		if (typeof(this.oldGame.rememberLogin) === "undefined")
		{
			wildnGameSettings.rememberLogin = false;
		}
		if (typeof(this.oldGame.sound) === "undefined")
		{
			this.oldGame.sound = true;
		}
		if (typeof(this.oldGame.cardBack) === "undefined")
		{
			this.oldGame.cardBack = "back1";
		}
		if (typeof(this.oldGame.gameBack) === "undefined")
		{
			this.oldGame.gameBack = 1;
		}
		if (typeof(this.oldGame.nextSubmission) === "undefined")
		{
			this.oldGame.nextSubmission = 0;
		}
		if (typeof(this.oldGame.bgRankLevel) === "undefined")
		{
			this.oldGame.bgRankLevel = 0;
			this.oldGame.wgRankLevel = 0;
			this.oldGame.bgRankScore = 0;
			this.oldGame.wgRankScore = 0;
		}
		if (typeof(this.oldGame.wgMoney) === "undefined" && typeof(this.oldGame.bgMoney) === "undefined")
		{
			freshInstall = true;
		}
		if (typeof(this.oldGame.vsound) === "undefined"){
			this.oldGame.vsound = true;
		}
		if (typeof(this.oldGame.vnotifications) === "undefined"){
			this.oldGame.vnotifications = true;
		}
		if (typeof(this.oldGame.didTutorial) === "undefined"){
			this.oldGame.didTutorial = false;
		}
		if (loadGame){
			wildnGameSettings.vsound = this.oldGame.vsound;
			wildnGameSettings.vnotifications = this.oldGame.vnotifications;
			wildnGameSettings.wgMoney = this.oldGame.wgMoney;
			wildnGameSettings.bgMoney = this.oldGame.bgMoney;
			wildnGameSettings.wgBet = this.oldGame.wgBet;
			wildnGameSettings.bgBet = this.oldGame.bgBet;
			wildnGameSettings.autoDeal = this.oldGame.autoDeal;
			wildnGameSettings.sound = this.oldGame.sound;
			wildnGameSettings.cardBack = this.oldGame.cardBack;
			wildnGameSettings.gameBack = this.oldGame.gameBack;
			wildnGameSettings.bgRankLevel = this.oldGame.bgRankLevel;
			wildnGameSettings.wgRankLevel = this.oldGame.wgRankLevel;
			wildnGameSettings.bgRankScore = this.oldGame.bgRankScore;
			wildnGameSettings.wgRankScore = this.oldGame.wgRankScore;
			wildnGameSettings.nextSubmission = this.oldGame.nextSubmission;
			wildnGameSettings.rememberLogin = this.oldGame.rememberLogin;
			wildnGameSettings.didTutorial = this.oldGame.didTutorial;
		}
		
		
		/*console.log("***TESTING***");
		wildnGameSettings.resumePause = true;
		isFlashing = false;
		secondDeal = true;
		wildnGameSettings.isTesting = true;
		flipState = new Array(0,0,0,0,0);
		holdState = new Array(0,1,1,0,0);
		canFlip = new Array(1,1,1,1,1,1);
		playingWildnGame = true;
		wildnGameSettings.wgMoney = 275;
		wildnGameSettings.wild = 2;
		wildnGameSettings.cardSuit1 = 2;
		wildnGameSettings.cardSuit2 = 1;
		wildnGameSettings.cardSuit3 = 2;
		wildnGameSettings.cardSuit4 = 2;
		wildnGameSettings.cardSuit5 = 4;
		wildnGameSettings.cardNumber1 = 10;
		wildnGameSettings.cardNumber2 = 6;
		wildnGameSettings.cardNumber3 = 6;
		wildnGameSettings.cardNumber4 = 6;
		wildnGameSettings.cardNumber5 = 13;
		wildnGameSettings.wgBet = 5;
		wildnGameSettings.autoDeal = false;*/
		
	
	} else { //IF NO OLD COOKIE EXISTS!!!
		wildnGameSettings.vsound = true;
		wildnGameSettings.vnotifications = true;
		wildnGameSettings.autoDeal = true;
		wildnGameSettings.sound = true;
		wildnGameSettings.wgMoney = minBet*10;
		wildnGameSettings.wgBet = minBet;
		wildnGameSettings.bgMoney = minBet*10;
		wildnGameSettings.bgBet = minBet;
		wildnGameSettings.cardBack = "back1";
		wildnGameSettings.gameBack = 1;
		wildnGameSettings.bgRankLevel = 0;
		wildnGameSettings.wgRankLevel = 0;
		wildnGameSettings.bgRankScore = 0;
		wildnGameSettings.wgRankScore = 0;
		wildnGameSettings.nextSubmission = 0;
		canSubmit = true;
		freshInstall = true;
		wildnGameSettings.rememberLogin = false;
		wildnGameSettings.didTutorial = false;
	};
    this.storeCookie();
};
wildnGameCookie.prototype.storeCookie = function() {
	localStorage["wildnGame"] = JSON.stringify({ //this actually stores the cookie data, which is stored in the variable 'wildnGameSettings'
		versionString : wildnGameSettings.versionString,
		vsound : wildnGameSettings.vsound,
		vnotifications : wildnGameSettings.vnotifications,
		wgMoney : wildnGameSettings.wgMoney,
		bgMoney : wildnGameSettings.bgMoney,
		wgBet : wildnGameSettings.wgBet,
		bgBet : wildnGameSettings.bgBet,
		autoDeal : wildnGameSettings.autoDeal,
		sound : wildnGameSettings.sound,
		cardBack : wildnGameSettings.cardBack,
		gameBack : wildnGameSettings.gameBack,
		bgRankLevel : wildnGameSettings.bgRankLevel,
		wgRankLevel : wildnGameSettings.wgRankLevel,
		bgRankScore : wildnGameSettings.bgRankScore,
		wgRankScore : wildnGameSettings.wgRankScore,
		nextSubmission : wildnGameSettings.nextSubmission,
		rememberLogin : wildnGameSettings.rememberLogin,
		didTutorial : wildnGameSettings.didTutorial,
	});
};