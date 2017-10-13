
/*
 * 
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 * 
 */

function WildngameAssistant() {
}
WildngameAssistant.prototype.hideElement = function(e){
	switch(deviceType){
		case "Android":
			e.style.visibility = "hidden"; //Android
			break;
		default:
			e.style.marginTop = "9999px"; //iOS, webOS
			break;
	}
};
WildngameAssistant.prototype.showElement = function(e){
	switch(deviceType){
		case "Android":
			e.style.visibility = "visible"; //Android
			break;
		default:
			e.style.marginTop = null; //iOS, webOS
			break;
	}
};
WildngameAssistant.prototype.isShowing = function(e){
	var isShowing;
	switch(deviceType){
		case "Android":
			isShowing = (e.style.visibility != "hidden"); //Android
			break;
		default:
			isShowing = (e.style.marginTop != "9999px"); //iOS, webOS
			break;
	}
	return isShowing;
};
WildngameAssistant.prototype.activate = function(event) {
	var holdButton;
	turnSpeed = 300;
	if(deviceType == "iOS"){
		turnSpeed = 210;
	}
	//if(DetectIOS){turnSpeed = 0}
	cardNumber = new Array(5);
	cardSuit = new Array(5);
	cardNumber2 = new Array(5);
	cardSuit2 = new Array(5);
	cardState = new Array(5);
	checkStraight = new Array(5);
	
	resume = firstRefresh = delayPayoutSound = dontFlipDown = false;
	t1 = t2 = t3 = t4 = t5 = t6 = t = dontAllow = numFlashes = tFS = tBET = 0;
	
	for (var x = 1; x <= 5; x++){
		var divString = "card" + x;
		var piece2 = '<img alt="" class="shadow rotateCard" id="' + divString + 'shadow" src="images/CARD-SHADOW.png" /><img alt="" class="back rotateCard" style="margin-top: ' + (-11 / scaleFactor) + 'px;"id="' + divString + 'down" src="images/card-backs/' + cardBack + '.png" />';
		document.getElementById(divString + "backside").innerHTML = piece2;
		if (doScale) {
			scale(["card" + x + "shadow", "card" + x + "down"], true, true, true, false);
		}
	}
	document.getElementById("back2").style.visibility = "visible";
	document.getElementById("back2").addEventListener(upEvent, this.back_.bind(this));
	document.getElementById("deal-bar").style.visibility = "visible";
	document.getElementById("divider").style.visibility = "visible";
	var suits = ["hearts", "diamonds", "clubs", "spades"];
	var i = 4;
	do{
		document.getElementById(suits[i-1]).style.visibility = "hidden";
	} while (--i);
	currentScene = "wildngame";
	markAppForeground();
	var i = 5;
	do{
		document.getElementById("card" + i + "contents").style.visibility = "visible";
		document.getElementById("card" + i + "backside").style.visibility = "visible";
		this.showElement(document.getElementById("card" + i + "contents"));
		this.hideElement(document.getElementById("card" + i + "backside"));
	} while (--i);
	switch (playingWildnGame){
		case (true):
			money = wildnGameSettings.wgMoney;
			bet = wildnGameSettings.wgBet;
			document.getElementById("wild").style.visibility = "visible";
			difficulty = 3;
			break;
		case (false):
			money = wildnGameSettings.bgMoney;
			bet = wildnGameSettings.bgBet;
			difficulty = 1;
			wild = 0;
			break;
	};
	if (wildnGameSettings.isTesting){
		var isTesting = true;
		wildnGameSettings.isTesting = false;
	}
	if (wildnGameSettings.resumePause && (!isFlashing || (typeof(isTesting)!="undefined" && isTesting == true))){
		resume = true;
		wildnGameSettings.resumePause = false;
	}
	switch (resume) {
		case (true):
			if (playingWildnGame){wild = wildnGameSettings.wild};
			cardSuit[0] = wildnGameSettings.cardSuit1;
			cardSuit[1] = wildnGameSettings.cardSuit2;
			cardSuit[2] = wildnGameSettings.cardSuit3;
			cardSuit[3] = wildnGameSettings.cardSuit4;
			cardSuit[4] = wildnGameSettings.cardSuit5;
			cardNumber[0] = wildnGameSettings.cardNumber1;
			cardNumber[1] = wildnGameSettings.cardNumber2;
			cardNumber[2] = wildnGameSettings.cardNumber3;
			cardNumber[3] = wildnGameSettings.cardNumber4;
			cardNumber[4] = wildnGameSettings.cardNumber5;
			break;
		case (false):
			wildnGameSettings.resumePause = false;
			didFlipAll = false;
			secondDeal = false;
			flipState = new Array(5);
			holdState = new Array(5);
			canFlip = new Array(6);
			toDeal = 5;
			this.dealSound5();
			break;
	};
	this.showUp();
	console.log("LALALA1");
	if (!isTesting) {
		this.showScore(this, 0, money);
		console.log("LALALA2");
		this.firstDeal();
	}
	this.refreshFlipState();
	var i = 5;
	do {
		holdState[i-1]==1 ? document.getElementById("held"+i).style.visibility = "visible" : document.getElementById("held"+i).style.visibility = "hidden";
		if (autoDeal) {
			flipState[i - 1] = 1;
		};
	} while (--i);
	if (typeof(isTesting)!="undefined" && isTesting === true){
		prize = 0;
		this.showScore(this, prize, money);
		this.showWild();
		this.deal();
	}
};
WildngameAssistant.prototype.deactivate = function() {
	//this.showUp();
	document.getElementById("wild").style.visibility = "hidden";
	document.getElementById("divider").style.visibility = "hidden";
	document.getElementById("deal-bar").style.visibility = "hidden";
	document.getElementById("deal").style.visibility = "hidden";
	document.getElementById("winnerBar").style.visibility = "hidden";
	if(document.getElementById("wildCard1")!=null){
	document.getElementById("wildCard1").style.visibility = "hidden";
	}
	document.getElementById("score").style.visibility = "hidden";
	document.getElementById("winnerZ").innerHTML = "";
	document.getElementById("back2").style.visibility = "hidden";
	var i = 5;
	do{
		document.getElementById("card" + i + "backside").style.webkitTransform = "";
		this.hideElement(document.getElementById("card" + i + "contents"));
		this.hideElement(document.getElementById("card" + i + "backside"));
		document.getElementById("scoreDigit" + i + "div").style.visibility = "hidden";
		document.getElementById("tapZone" + i + "").style.visibility = "hidden";
		document.getElementById("held" + i + "").style.visibility = "hidden";
	} while (--i);
	var i = 4;
	var suits = ["hearts", "diamonds", "clubs", "spades"];
	do{
		document.getElementById(suits[i-1]).style.visibility = "visible";
	} while (--i);
	
	(money <= 0 && !makeNew) ? stage.createNewGame() : stage.saveGame();
	var fastBet;
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	if (money < fastBet && playingWildnGame && money < minBet * 3 && !makeNew){
		stage.createNewGame();
	};
	clearTimeout(t); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
	pWait = t = t1 = t2 = t3 = t4 = t5 = t6 = 0;
};
WildngameAssistant.prototype.back = function(event) {
	if(forceWait){
		setTimeout(this.back.bind(this), 1000);
		return;
	}
	if (!t3 && !t4 && !t5 && !t6 && ((!autoDeal && !secondDeal) || autoDeal && !secondDeal || isFlashing) && !dontAllow && !rankUp && !makeNew){
		document.getElementById("deal-bar").style.visibility = "hidden";
		document.getElementById("back2").style.opacity = ".5";
		timeout = pWait + 100;
		t4 = setTimeout(function(){
			swapScene("menu");
			document.getElementById("back2").style.opacity = "1";
			document.getElementById("back2").style.visibility = "hidden";
		}, timeout);
	};
};
WildngameAssistant.prototype.forward = function(event) {
	if (!t3 && !t4 && !t5 && !t6 && ((!autoDeal && !secondDeal) || autoDeal || isFlashing) && !dontAllow && !rankUp){
		document.getElementById("deal-bar").style.visibility = "hidden";
		timeout = pWait + 100;
		t5 = setTimeout(function(){
			scene = "wildngame";
			betStatus = "bet";
			menuStatus = "bet";
			swapScene("menu");
		}, timeout);
	}
};
WildngameAssistant.prototype.tapZone1 = function(event){
	holdButton = 1;
	flipState[0]==1 ? this.holdCard() : this.flipCard(1);
};
WildngameAssistant.prototype.tapZone2 = function(event){
	holdButton = 2;
	flipState[1]==1 ? this.holdCard() : this.flipCard(2);
};
WildngameAssistant.prototype.tapZone3 = function(event){
	holdButton = 3;
	flipState[2]==1 ? this.holdCard() : this.flipCard(3);
};
WildngameAssistant.prototype.tapZone4 = function(event){
	holdButton = 4;
	flipState[3]==1 ? this.holdCard() : this.flipCard(4);
};
WildngameAssistant.prototype.tapZone5 = function(event){
	holdButton = 5;
	flipState[4]==1 ? this.holdCard() : this.flipCard(5);
};
WildngameAssistant.prototype.refreshFlipState = function(){
	var flippedAll;
	var doFlip;
	switch (autoDeal) {
		case true:
			if (isFlashing) {
				timeout = pWait + 75;
				setTimeout(this.newHand.bind(this), timeout);
				return;
			};
			var iz = 5;
			do {
				flipState[iz - 1] = 1;
			} while (--iz);
			flippedAll = 5;
			didFlipAll = true;
			this.showUp();
			break;
		case false:
			var iz = 5;
			flippedAll = 0;
			do {
				if (flipState[iz - 1] == 1) {
					flippedAll++;
				}
			} while (--iz);
			didFlipAll = flippedAll == 5;// ? true : false;
			break;
	};
	doFlip = flippedAll == 0 || secondDeal;// ? true : false;
	iz = 0;
	var xi = 0;
	do {
		if(flipState[iz - 1] == 0 && doFlip){
			var thisCard = iz;
			timeout = secondDeal ? iz * 90 : xi * 125;
			setTimeout(this.flipDown.bind(this), timeout, thisCard);
			xi++;
		};
	} while (iz++ < 5);
	if (didFlipAll) {
		switch (secondDeal) {
			case (true):
				autoDeal === false ? t2 = setTimeout(this.flippedAll.bind(this), turnSpeed) : this.flippedAll();
				break;
			case (false):
				if(!autoDeal){document.getElementById("deal").style.visibility = "visible";}
				break;
		};
	}
};
WildngameAssistant.prototype.flipCard = function(cardToFlip){
	if (!canFlip[cardToFlip] || forceWait){
		setTimeout(this.flipCard.bind(this), 175, cardToFlip);
		return;
	}
	this.flipSound();
	clearTimeout(tFS);
	var it = cardToFlip;
	document.getElementById("card" + it + "backside").style.webkitTransform = webkitTransform;
	document.getElementById("card" + it + "contents").style.webkitTransform = "";
	flipState[it - 1] = 1;
	if (secondDeal){document.getElementById("tapZone" + it).style.visibility = "hidden";}
	setTimeout(function(){
		WildngameAssistant.prototype.showElement(document.getElementById("card" + it + "contents"));
		WildngameAssistant.prototype.hideElement(document.getElementById("card" + it + "backside"));
		canFlip[it] = 0;
	}, turnSpeed);
	tFS = setTimeout(this.refreshFlipState.bind(this), turnSpeed);
};
WildngameAssistant.prototype.holdCard = function(){
	var i = holdButton;
	switch (document.getElementById("held"+i).style.visibility) {
		case "visible":
			document.getElementById("held"+i).style.visibility = "hidden";
			holdState[i - 1] = 0;
			toDeal++;
			this.unholdSound();
			break;
		case "hidden":
			document.getElementById("held"+i).style.visibility = "visible";
			holdState[i - 1] = 1;
			toDeal--;
			this.holdSound();
			break;
	};
};
WildngameAssistant.prototype.flipDown = function(thisCard){
	if(dontFlipDown){return;}
	var lastCard = thisCard;
	document.getElementById("card" + lastCard + "backside").style.webkitTransform = "";
	document.getElementById("card" + lastCard + "contents").style.webkitTransform = webkitTransform;
	t1 = setTimeout(this.showDown.bind(this), turnSpeed, lastCard);
};
WildngameAssistant.prototype.showDown = function(lastCard){
	var divString;
	if(didFlipAll && lastCard == 5){dontFlipDown = true};
	divString = "card" + lastCard;
	this.hideElement(document.getElementById(divString + "contents"));
	this.showElement(document.getElementById(divString + "backside"));
	document.getElementById(divString + "backside").style.webkitTransform = "";
	var i = 5;
	var deal = 0;
	do{
		if (this.isShowing(document.getElementById("card" + i + "backside"))) {
			deal++;
		}
	} while (--i);
	//console.log(deal);
	if(deal == 5 && !secondDeal || deal + (5 - z) == 5 && secondDeal){
		this.deal();
		z = 0;
	};
};
WildngameAssistant.prototype.showUp = function(){
	var i = 5;
	var divString;
	do{
		if (flipState[i - 1] == 1) {
			this.hideElement(document.getElementById("card" + i + "backside"));
			document.getElementById("card" + i + "backside").style.webkitTransform = webkitTransform;
		} else if (!autoDeal) {
			this.hideElement(document.getElementById("card" + i + "contents"));
			document.getElementById("card" + i + "contents").style.webkitTransform = webkitTransform;
			this.showElement(document.getElementById("card" + i + "backside"));
		}
	} while (--i);
};
WildngameAssistant.prototype.flippedAll = function(event) {
	if (!isFlashing) {
		pWait = 2800;
		this.checkWinners();
		isFlashing = true;
		nextHand = true;
		document.getElementById("deal-bar").style.visibility = "visible";
	}
};
WildngameAssistant.prototype.showWild = function(){
	var bgUrl;
	switch(wild) {
		case 2:	case 3:	case 4:	case 5:	case 6:	case 7:	case 8:	case 9: case 10:
			bgUrl = "images/menu/numbers/" + wild + ".png";
			break;
		case 11:
			bgUrl = "images/menu/numbers/J" + ".png";
			break;
		case 12:
			bgUrl = "images/menu/numbers/Q" + ".png";
			break;
		case 13:
			bgUrl = "images/menu/numbers/K" + ".png";
			break;
		case 14:
			bgUrl = "images/menu/numbers/A" + ".png";
			break;
	};

	document.getElementById("wildCard").innerHTML = '<img alt="" id="wildCard1" class="wildCard" style="visibility:visible;margin-top:' + verticalMargin + 'px; margin-left:' + horizontalMargin + 'px;" src="' + bgUrl + '" />';
	
	if (wild === 10){
		document.getElementById("wildCard1").style.width = "36px";
	} else if (wild > 10){
		document.getElementById("wildCard1").style.height = "30px";
		document.getElementById("wildCard1").style.width = "30px";
		document.getElementById("wildCard1").style.marginTop = verticalMargin - 1 + "px";
	}
	
	if(doScale){
		scale(["wildCard1"]);
	}
};
WildngameAssistant.prototype.flipSound = function(){
	if (!sound){return};
	playSound(0);
};
WildngameAssistant.prototype.holdSound = function(){
	if (!sound){return};
	playSound(1);
};
WildngameAssistant.prototype.unholdSound = function(){
	if (!sound){return};
	playSound(2);
};
WildngameAssistant.prototype.dealSound1  = function(){
	if (!sound){return};
	playSound(3);
};
WildngameAssistant.prototype.dealSound2 = function(){
	if (!sound){return};
	playSound(4);
};
WildngameAssistant.prototype.dealSound3 = function(){
	if (!sound){return};
	playSound(5);
};
WildngameAssistant.prototype.dealSound4 = function(){
	if (!sound){return};
	playSound(6);
};
WildngameAssistant.prototype.dealSound5 = function(){
	if (!sound || makeNew || menuStatus === "fastBet"){return};
	playSound(7);
};
WildngameAssistant.prototype.payoutSound = function(){
	if (!sound){return};
	switch (true){
		case (prize<100):
			playSound(8);
			break;
		case (prize<500):
			playSound(9);
			break;
		case (prize>=500):
			playSound(10);
			break;
	};
	delayPayoutSound = false;
};
WildngameAssistant.prototype.lvlUpSound = function(){
	if (!sound){return};
	playSound(11);
};
WildngameAssistant.prototype.loseSound = function(){
	if (!sound){return};
	playSound(12);
};
WildngameAssistant.prototype.deal = function() {
//THIS IS THE LAST FUNCTION CALLED AFTER A NEW HAND.
	dontFlipDown = true;
	t = 0; t1 = 0; t2 = 0; t3 = 0; t4 = 0; t5 = 0; t6 = 0;
	var _c = 5;
	do
	{
		var left;
		var number;
		var suit;
		if (!cardState[_c - 1])
		{
			switch (resume)
			{
				case true:
					number = cardNumber[_c - 1];
					suit = cardSuit[_c - 1];
					break;
				case false:
					do
					{
						var loop = false;
						number = randomInt(2, 14);
						suit = randomInt(1, 4);
						var i = 5;
						do
						{
							var x = i - 1;
							if ((cardNumber[x] == number && cardSuit[x] == suit) || (cardNumber2[x] == number && cardSuit2[x] == suit))
							{
								loop = true;
							};
						} while (--i);
					} while (loop);
					cardNumber[_c - 1] = number;
					cardSuit[_c - 1] = suit;
					break;
			};
			var leftImg1 = 0;
			var leftImg2 = 0;
			var topImg1 = 6;
			var topImg2 = 99;
			switch (number)
			{
				case 10:
					leftImg1 = leftImg1 - 13;
					leftImg2 = leftImg2 + 2;
				case 4:
					leftImg1 = leftImg1 + 1;
				case 2:	case 3:	case 4:	case 5:	case 6:	case 7:	case 8:	case 9: case 10:
					bgUrl = "images/black/" + number + ".png";
					break;
				case 11:
					bgUrl = "images/black/J.png";
					break;
				case 12:
					bgUrl = "images/black/Q.png";
					leftImg1 = leftImg1 + 1;
					leftImg2 = leftImg2 - 1;
					//topImg1 = topImg1 - 1;
					//topImg2 = topImg2 - 1;
					break;
				case 13:
					bgUrl = "images/black/K.png";
					leftImg1 = leftImg1 + 1;
					leftImg2 = leftImg2 - 1;
					break;
				case 14:
					bgUrl = "images/black/A.png";
					//leftImg2 = leftImg2 - 2;
					break;
			};
			var digitWidth = 33;
			if (number == 10){digitWidth = 43};
			var divString = "card" + _c;
			/*document.getElementById(divString + "left").style.width = digitWidth + "px";
			document.getElementById(divString + "left").style.left = leftImg1 + "px";
			document.getElementById(divString + "left").style.top = topImg1 + "px";
			document.getElementById(divString + "left").style.backgroundImage = bgUrl;
			document.getElementById(divString + "right").style.width = digitWidth + "px";
			document.getElementById(divString + "right").style.left = leftImg2 + "px";
			document.getElementById(divString + "right").style.top = topImg2 + "px";
			document.getElementById(divString + "right").style.backgroundImage = bgUrl;*/
			
			var style1 = 'visibility:inherit;width:' + digitWidth + 'px;margin-left:' + leftImg1 / scaleFactor + 'px;" src="' + bgUrl;
			var style2 = 'visibility:inherit;width:' + digitWidth + 'px;margin-left:' + leftImg2 / scaleFactor + 'px;" src="' + bgUrl;
			
			switch (suit)
			{
				case 1:
					bgUrl = "images/suits/clubs3.png";
					break;
				case 2:
					bgUrl = "images/suits/diamonds3.png";
					break;
				case 3:
					bgUrl = "images/suits/hearts3.png";
					break;
				case 4:
					bgUrl = "images/suits/spades3.png";
					break;
			};
			//document.getElementById(divString + "suit").style.left = 6 + "px";
			//document.getElementById(divString + "suit").style.backgroundImage = bgUrl;
			
			var style3 = 'visibility:inherit;" src="' + bgUrl;
			
			var piece1 = '<img alt="" id="' + divString + 'right" class="cardRight" style="' + style1 + '" />';
			var piece2 = '<img alt="" id="' + divString + 'left" class="cardLeft" style="' + style2 + '" />';
			var piece3 = '<img alt="" id="' + divString + 'suit" class="cardSuit" style="' + style3 + '" />';
			var piece4 = '<img alt="" id="' + divString + 'up" class="cardFace" src="images/CARD-BACKGROUND.png" />'
			
			document.getElementById(divString + "contents").innerHTML = piece4 + piece2 + piece3 + piece1;
			
			if (horizontalMargin){
				document.getElementById(divString + "contents").style.marginLeft = horizontalMargin + "px";
			}
			if(verticalMargin){
				document.getElementById(divString + "contents").style.marginTop = verticalMargin + "px";
			}
			if (doScale) {
				scale([divString + "right", divString + "left", divString + "suit", divString + "up"], true, true, false, false);
			}
			document.getElementById(divString + "contents").className = "";
			if(!autoDeal && !resume){
				document.getElementById(divString + "contents").style.webkitTransform = webkitTransform;
				canFlip[_c] = 1;
			} else {
				document.getElementById(divString + "contents").style.webkitTransform = "";
			}
			document.getElementById(divString + "contents").className += "fix front rotateCard";
		};
	} while (--_c);
	if (resume)
	{
		resume = false;
		wildnGameSettings.resume = false;
	};
	var didFlipAll = 0;
	var i = 5;
	do {
		if (flipState[i - 1] == 1){
			didFlipAll++;
			break;
		};
	} while (--i);
	if (autoDeal && (secondDeal || didFlipAll > 0)){this.refreshFlipState()};
};
WildngameAssistant.prototype.firstDeal = function(event) {
	
	console.log("Deal 1 Initialized..");
    wildnGameSettings.money = money;
	if(autoDeal){
		setTimeout(function(){
			document.getElementById("deal").style.visibility = "visible";
			dontAllow = false;
		}, 1100);
	} else {
		document.getElementById("deal").style.visibility = "hidden";
		dontAllow = false;
	}
	document.getElementById("deal-bar").style.visibility = "hidden";
	var i = 5;
	do {
		document.getElementById("tapZone" + i).style.visibility = "visible";
	} while (--i);
	if (playingWildnGame)
	{
		if (!resume){wild = randomInt(2, 14)};
		this.showWild();
	};
	if (!resume)
	{
		var i = 5;
		do {
			var x = i - 1;
			cardSuit[x] = cardNumber[x] = cardNumber2[x] = cardSuit2[x] = cardState[x] = 0;
			if(!autoDeal){flipState[x] = 0};
		} while (--i);
	};
	queDeal = true;
	if(autoDeal || resume || isFlashing){this.deal()};
	isFlashing = didFlipAll = false;
	numFlashes = 0;
	console.log("Cards dealt, waiting for response..")
};
WildngameAssistant.prototype.secondDeal = function(event) {
	if(secondDeal && !isFlashing){
		return;
	}
	document.getElementById("deal").style.visibility = "hidden";
	document.getElementById("deal-bar").style.visibility = "hidden";
	switch (secondDeal){
		case true:
			timeout = pWait + 75;
			if(makeNew && !rankUp){
				this.loseSound();
			};
			if (!dontAllow){t6 = setTimeout(this.newHand.bind(this), timeout)};
			document.getElementById("winner").style.opacity = ".5";
			break;
		case false:
			switch (toDeal){
				case 1:
					this.dealSound1();
					break;
				case 2:
					this.dealSound2();
					break;
				case 3:
					this.dealSound3();
					break;
				case 4:
					this.dealSound4();
					break;
				case 5:
					this.dealSound5();
					break;
			};
			secondDeal = true;
			console.log("Deal 2 Initiated..");
			didFlipAll = 0;
			z = 0;
			var ix = 5;
			do
			{
				var x = ix - 1;
				switch (document.getElementById("held" + ix).style.visibility){
					case "visible":
						cardState[x] = 1;
						break;
					case "hidden":
						cardNumber2[x] = cardNumber[x];
						cardSuit2[x] = cardSuit[x];
						flipState[x] = 0;
						z++;
						break;
				};
			} while (--ix);
			dontFlipDown = false;
			switch(autoDeal){
				case true:
					this.deal();
					break;
				case false:
					this.refreshFlipState();
					break;
			};
			ix = 5;
			do
			{
				switch (flipState[ix - 1])
				{
					case 0:
						document.getElementById("tapZone" + ix).style.visibility = "visible";
						break;
					case 1:
						didFlipAll++;
						document.getElementById("tapZone" + ix).style.visibility = "hidden";
						break;
				};
			} while (--ix);
			if (didFlipAll == 5){this.flippedAll();}
			break;
	};
};
WildngameAssistant.prototype.flashWinner = function () {
	document.getElementById("winner").style.visibility === "visible" ? document.getElementById("winner").style.visibility = "hidden" : document.getElementById("winner").style.visibility = "visible";
	t1 = setTimeout(this.flashWinner.bind(this), 700);
	numFlashes++;
};
WildngameAssistant.prototype.checkWinners = function(event) {
	prize = 0;
	var pairs = 0;
	var wildRoyalFlush = 0;
	var winner = "LOSER";
	var isWinner = false;
	var isNatural = false;
	var straight = 0;
	var numWildCards = 0;
	var wildCheck = [0,0,0,0,0];
	checkStraight = [0,0,0,0,0];
	var wildFlush = 0;
	var a, i, x, c;
	
	i = 5;
	c = 0;
	do{
		c = cardNumber[i - 1] + c;
	} while (--i);
	
	/* THE FOLLOWING LINES OF CODE ARE FOR THE WILDN GAME MODE */
	switch (playingWildnGame)
	{
		case true:
			i = 5;
			do{
				if (cardNumber[i - 1] == wild)
				{
					wildCheck[i - 1] = 1;
					numWildCards++;
				};
			} while (--i);
			console.log("numWildCards");
			console.log(numWildCards);
			if (numWildCards > 0)
			{
				for(a = 0; a < 5; a++)
				{
					for(i = a + 1; i < 5; i++)
					{
						if (cardNumber[a] == cardNumber[i] && cardNumber[a] != wild){pairs++};
					};
				};
				console.log("pairs");
				console.log(pairs);
				if (( (pairs == 2 && numWildCards == 1) )&&!(prize > 15))
				{
					winner = "FULL-HOUSE";
					prize = 20;
					isNatural = false;
					isWinner = true;
				};
				if (numWildCards == 4 && !(prize > 1000))
				{
					winner = "FOUR-WILD";
					prize = 1000;
					isNatural = false;
					isWinner = true;
				};
				if (!(prize>50)&&((pairs == 3 && numWildCards == 2) || (pairs == 1 && numWildCards == 3) || (pairs == 6 && numWildCards == 1)))
				{
					winner = "FIVE-OF-A-KIND";
					prize = 50;
					isNatural = false;
					isWinner = true;
				};
				for (a = 0; a < 4; a++)
				{
					for (i = a + 1; i < 5; i++)
					{
						if (cardSuit[i] == cardSuit[a] && cardNumber[i] != cardNumber[a] && ((cardNumber[a] > 9 && cardNumber[a] != wild) && (cardNumber[i] > 9 && cardNumber[i] != wild)))
						{
							wildRoyalFlush++;
						};
					};
				};
				if (!(prize > 100) && (wildRoyalFlush == 6 && numWildCards == 1 || wildRoyalFlush == 3 && numWildCards == 2))
				{
					winner = "WILD-ROYAL-FLUSH";
					prize = 100;
					isNatural = false;
					isWinner = true;
				};
				
				if (!(prize>15) && ( (pairs == 3 && numWildCards == 1) || (pairs == 1 && numWildCards == 2) || (pairs == 0 && numWildCards == 3) ) )
				{
						winner = "FOUR-OF-A-KIND";
						prize = 15;
						isNatural = false;
						isWinner = true;
				};
				if (!(prize > 5) && ((pairs == 1 && numWildCards == 1) || numWildCards == 2))
				{
						winner = "THREE-OF-A-KIND";
						prize = 5;
						isNatural = false;
						isWinner = true;
				};
				var wildStraight;
				wild == 14 ? wildStraight = 0 : wildStraight = 39;
				if (numWildCards == 2 && !wild == 14){wildStraight = 49};
				if (c <= wildStraight)
				{
					for(x = 0; x < 5; x++){
						if (cardNumber[x] == 14){cardNumber[x] = 1};
					};
				};
				for(x = 0; x < 5; x++){
					checkStraight[x] = cardNumber[x];
				};
				checkStraight.sort(sortNumber);
				var straight = 0;
				a = 5;
				do
				{
					x = 5;
					do
					{
						if (checkStraight[a - 1] - checkStraight[x - 1] <= 4 && checkStraight[a - 1] - checkStraight[x - 1] >= 1
							&& checkStraight[a - 1] != wild && checkStraight[x - 1] != wild){straight++};
					} while (--x);
				} while (--a);
				
				if (c <= wildStraight)
				{
					for(x = 0; x < 5; x++){
						if(cardNumber[x] == 1){cardNumber[x] = 14};
					};
				};
				var wildFlush = 0;
				for(a = 0; a < 4; a++)
				{
					for(i = a + 1; i < 5; i++)
					{
						if(cardSuit[a] == cardSuit[i] && cardNumber[a] != wild && cardNumber[i] != wild){wildFlush++};
					};
				};
				console.log("wildflush");
				console.log(wildFlush);
				console.log("cardnumber");
				console.log(cardNumber);
				console.log("cardsuit");
				console.log(cardSuit);
				if ((straight >= 6 && numWildCards == 1) || (straight == 3 && numWildCards == 2 ))
				{
					if (!(prize>40)&&((wildFlush == 6 && numWildCards == 1) || (wildFlush == 3 && numWildCards == 2)))
					{
						winner = "STRAIGHT-FLUSH";
						prize = 40;
						isNatural = false;
						isWinner = true;
					};
					if (!(prize>10))
					{
						winner = "STRAIGHT";
						prize = 10;
						isNatural = false;
						isWinner = true;
					};
				};
				if (!(prize>15)&&((wildFlush == 6 && numWildCards == 1) || (wildFlush == 3 && numWildCards == 2)))
				{
					winner = "WILD-FLUSH";
					prize = 15;
					isNatural = false;
					isWinner = true;
				};
				i = 5;
				var wildPair = 0;
				do
				{
					if (cardNumber[i - 1] > 10 && cardNumber[i - 1] != wild && numWildCards == 1) {wildPair++};
				} while (--i);
				if (!(prize>0) && wildPair)
				{
					winner = "WILD-PAIR";
					prize = 0;
					isNatural = false;
					isWinner = true;
				};
			};
			
			//non wild checkers
			if (c <= 28) {
				for(i = 0; i < 5; i++){
					if (cardNumber[i] == 14){cardNumber[i] = 1};
				};
			};
			for(i = 0; i < 5; i++){
				checkStraight[i] = cardNumber[i];
			};
			for(i = 0; i < 5; i++){
				if (cardNumber[i] == 1){cardNumber[i] = 14};
			};
			checkStraight.sort(sortNumber);
			if (checkStraight[0] - 4 == checkStraight[4] && checkStraight[1] - 3 == checkStraight[4] && checkStraight[2] - 2 == checkStraight[4] && checkStraight[3] - 1 == checkStraight[4])
			{
				if ((cardSuit[0]==cardSuit[1])&&(cardSuit[1]==cardSuit[2])&&(cardSuit[2]==cardSuit[3])&&(cardSuit[3]==cardSuit[4]))
				{
					if (checkStraight[4] > 9 && bet == 25)
					{
						winner = "ROYAL-FLUSH";
						prize = 10000;
						isNatural = true;
						isWinner = true;
						//DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
						/////////////////////////////////////////////
						/////////SOMETHING SPECIAL
					};
					if (!(prize > 2500) && checkStraight[4] > 9)
					{
						winner = "ROYAL-FLUSH";
						prize = 2500;
						isNatural = true;
						isWinner = true;
						//DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
						/////////////////////////////////////////////
						/////////SOMETHING SPECIAL
					};
					if (!(prize>500))
					{
						winner = "STRAIGHT-FLUSH";
						prize = 500;
						isNatural = true;
						isWinner = true;
					};
				};
				if (!(prize>20))
				{
					winner = "STRAIGHT";
					prize = 20;
					isNatural = true;
					isWinner = true;
				};
			};
			if (!(prize>30) && (cardSuit[0] == cardSuit[1] && cardSuit[1] == cardSuit[2] && cardSuit[2] == cardSuit[3] && cardSuit[3] == cardSuit[4]))
			{
				winner = "FLUSH";
				prize = 30;
				isNatural = true;
				isWinner = true;
			};
			x = 0;
			var pairChecker = 0;
			pairs = 0;
			for(a = 0; a < 4; a++)
			{
				for(i = a + 1; i < 5; i++)
				{
					cardNumber[a] == cardNumber[i] && cardNumber[a] != wild ? x = 1 : x = 0;
					if (x == 1 && cardNumber[a] > 10){pairChecker++};
					pairs = pairs + x;
				};
			};
			if (pairs)
			{
				if (!(prize > 150) && pairs == 6)
				{
					winner = "FOUR-OF-A-KIND";
					prize = 150;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 45) && pairs == 4)
				{
					winner = "FULL-HOUSE";
					prize = 45;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 10) && pairs == 3)
				{
					winner = "THREE-OF-A-KIND";
					prize = 10;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 10) && pairs == 2)
				{
					winner = "TWO-PAIR";
					prize = 10;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize>5) && !(winner === "THREE-OF-A-KIND") && pairChecker > 0)
				{
					winner = "PAIR";
					prize = 5;
					isNatural = true;
					isWinner = true;
				};
			};
			break;
		
		
		case false: //basic game check
			if (c <= 28) {
				for(i = 0; i < 5; i++){
					if (cardNumber[i] == 14){cardNumber[i] = 1};
				};
			};
			for(i = 0; i < 5; i++){
				checkStraight[i] = cardNumber[i];
			};
			checkStraight.sort(sortNumber);
			for(i = 0; i < 5; i++){
				if (cardNumber[i] == 1){cardNumber[i] = 14};
			};
			if (checkStraight[0] - 4 == checkStraight[4] && checkStraight[1] - 3 == checkStraight[4] && checkStraight[2] - 2 == checkStraight[4] && checkStraight[3] - 1 == checkStraight[4])
			{
				if ((cardSuit[0]==cardSuit[1])&&(cardSuit[1]==cardSuit[2])&&(cardSuit[2]==cardSuit[3])&&(cardSuit[3]==cardSuit[4]))
				{
					if (checkStraight[4] > 9 && bet == 25)
					{
						winner = "ROYAL-FLUSH";
						prize = 16000;
						isNatural = true;
						isWinner = true;
						//DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
						/////////////////////////////////////////////
						/////////SOMETHING SPECIAL
					};
					if (!(prize > 4000) && checkStraight[4] > 9)
					{
						winner = "ROYAL-FLUSH";
						prize = 4000;
						isNatural = true;
						isWinner = true;
						//DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
						/////////////////////////////////////////////
						/////////SOMETHING SPECIAL
					};
					if (!(prize > 450))
					{
						winner = "STRAIGHT-FLUSH";
						prize = 450;
						isNatural = true;
						isWinner = true;
					};
				};
				if (!(prize > 20))
				{
					winner = "STRAIGHT";
					prize = 20;
					isNatural = true;
					isWinner = true;
				};
			};
			if (!(prize>30) && (cardSuit[0] == cardSuit[1] && cardSuit[1] == cardSuit[2] && cardSuit[2] == cardSuit[3] && cardSuit[3] == cardSuit[4]))
			{
				winner = "FLUSH";
				prize = 30;
				isNatural = true;
				isWinner = true;
			};
			var pairChecker = 0;
			pairs = 0;
			for(a = 0; a < 5; a++)
			{
				for(i = a + 1; i < 5; i++)
				{
					cardNumber[a] == cardNumber[i] && cardNumber[a] != wild ? x = 1 : x = 0;
					if (x == 1 && cardNumber[a] > 10){pairChecker++};
					pairs = pairs + x;
				};
			};
			console.log(cardNumber + "cn : cs" + cardSuit + "cs : pairs" + pairs);
			if (pairs){
				if (!(prize > 125) && pairs == 6)
				{
					winner = "FOUR-OF-A-KIND";
					prize = 125;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 45) && pairs == 4)
				{
					winner = "FULL-HOUSE";
					prize = 45;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 15) && pairs == 3)
				{
					winner = "THREE-OF-A-KIND";
					prize = 15;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize > 10) && pairs == 2)
				{
					winner = "TWO-PAIR";
					prize = 10;
					isNatural = true;
					isWinner = true;
				};
				if (!(prize>5) && !(winner === "THREE-OF-A-KIND") && pairChecker > 0)
				{
					winner = "PAIR";
					prize = 5;
					isNatural = true;
					isWinner = true;
				};
			};
			break;
	};
	if (!isWinner){prize = -5 * difficulty};
	prize = prize * (bet/5);
	money = money + prize;
	
	
	document.getElementById("winnerZ").innerHTML = '<img alt="" class="winner" id="winner" style="visibility:inherit;margin-top: ' + verticalMargin + 'px; margin-left: ' + horizontalMargin + 'px;" src="images/winners/' + winner + '.png" />';
	if(doScale){
		scale(["winner"]);
	}
	
	document.getElementById("winnerBar").style.visibility = "visible";
	this.showScore(this, prize, money);
	this.flashWinner();
	console.log(winner);
	//UPDATE STATS
	switch (playingWildnGame)
	{
		case false:
			switch(winner)
			{
				case "ROYAL-FLUSH":
					wildnGameStats.bgRYF++;
					wgStats[3]++;
					wgStats[17]++;
					break;
				case "STRAIGHT-FLUSH":
					wildnGameStats.bgSTF++;
					wgStats[4]++;
					wgStats[18]++;
					break;
				case "STRAIGHT":
					wildnGameStats.bgST++;
					wgStats[8]++;
					wgStats[22]++;
					break;
				case "FLUSH":
					wildnGameStats.bgFL++;
					wgStats[7]++;
					wgStats[21]++;
					break;
				case "FOUR-OF-A-KIND":
					wildnGameStats.bgFOAK++;
					wgStats[5]++;
					wgStats[19]++;
					break;
				case "FULL-HOUSE":
					wildnGameStats.bgFH++;
					wgStats[6]++;
					wgStats[20]++;
					break;
				case "THREE-OF-A-KIND":
					wildnGameStats.bgTOAK++;
					wgStats[9]++;
					wgStats[23]++;
					break;
				case "TWO-PAIR":
					wildnGameStats.bgTP++;
					wgStats[10]++;
					wgStats[24]++;
					break;
				case "PAIR":
					wildnGameStats.bgJOB++;
					wgStats[11]++;
					wgStats[25]++;
					break;
			};
			if (prize > 0)
			{
				wildnGameStats.bgTotalEarnings = wildnGameStats.bgTotalEarnings + prize;
				wgStats[1] = wgStats[1] + prize;
				wgStats[15] = wgStats[15] + prize;
				wildnGameStats.bgHandsWon++;
				wgStats[2]++;
				wgStats[16]++;
			} else {
				wildnGameStats.bgTotalLosses = wildnGameStats.bgTotalLosses - prize;
				wgStats[12] = wgStats[12] - prize;
				wgStats[26] = wgStats[26] - prize;
				wildnGameStats.bgHandsLost++;
				wgStats[13]++;
				wgStats[27]++;
			};
			wildnGameStats.bgHandsPlayed++;
			wgStats[0]++;
			wgStats[14]++;
			break;
		case true:
			switch(winner){
				case "ROYAL-FLUSH":
					wildnGameStats.wgRYF++;
					wgStats[31]++;
					wgStats[55]++;
					break;
				case "STRAIGHT-FLUSH":
					if (isNatural) {
						wildnGameStats.wgSTF++;
						wgStats[32]++;
						wgStats[56]++;
					} else {
						wildnGameStats.wgWSTF++;
						wgStats[45]++;
						wgStats[69]++;
					};
					break;
				case "STRAIGHT":
					if (isNatural) {
						wildnGameStats.wgST++;
						wgStats[36]++;
						wgStats[60]++;
					} else {
						wildnGameStats.wgWST++;
						wgStats[49]++;
						wgStats[73]++;
					};
					break;
				case "FLUSH":
					if (isNatural) {
						wildnGameStats.wgFL++;
						wgStats[35]++;
						wgStats[59]++;
					} else {
						wildnGameStats.wgWFL++;
						wgStats[43]++;
						wgStats[67]++;
					};
					break;
				case "FOUR-OF-A-KIND":
					if (isNatural) {
						wildnGameStats.wgFOAK++;
						wgStats[33]++;
						wgStats[57]++;
					} else {
						wildnGameStats.wgWFOAK++;
						wgStats[46]++;
						wgStats[70]++;
					};
					break;
				case "FULL-HOUSE":
					if (isNatural) {
						wildnGameStats.wgFH++;
						wgStats[34]++;
						wgStats[58]++;
					} else {
						wildnGameStats.wgWFH++;
						wgStats[47]++;
						wgStats[71]++;
					};
					break;
				case "THREE-OF-A-KIND":
					if (isNatural) {
						wildnGameStats.wgTOAK++;
						wgStats[37]++;
						wgStats[61]++;
					} else {
						wildnGameStats.wgWTOAK++;
						wgStats[50]++;
						wgStats[74]++;
					};
					break;
				case "TWO-PAIR":
					wildnGameStats.wgTP++;
					wgStats[38]++;
					wgStats[62]++;
					break;
				case "PAIR":
					wildnGameStats.wgJOB++;
					wgStats[39]++;
					wgStats[63]++;
					break;
				case "WILD-ROYAL-FLUSH":
					wildnGameStats.wgWFL++;
					wgStats[43]++;
					wgStats[67]++;
					break;
				case "WILD-FLUSH":
					wildnGameStats.wgWF++;
					wgStats[48]++;
					wgStats[72]++;
					break;
				case "WILD-PAIR":
					wildnGameStats.wgWP++;
					wgStats[51]++;
					wgStats[75]++;
					break;
				case "FOUR-WILD":
					wildnGameStats.wgFWC++;
					wgStats[42]++;
					wgStats[66]++;
					break;
				case "FIVE-OF-A-KIND":
					wildnGameStats.wgFVAK++;
					wgStats[44]++;
					wgStats[68]++;
					break;
			};
			if (prize>=0){
				wildnGameStats.wgTotalEarnings = wildnGameStats.wgTotalEarnings + prize;
				wgStats[29] = wgStats[29] + prize;
				wgStats[53] = wgStats[53] + prize;
				wildnGameStats.wgHandsWon++;
				wgStats[30]++;
				wgStats[54]++;
			} else if (prize<0){
				wildnGameStats.wgTotalLosses = wildnGameStats.wgTotalLosses - prize;
				wgStats[40] = wgStats[40] - prize;
				wgStats[64] = wgStats[64] - prize;
				wildnGameStats.wgHandsLost++;
				wgStats[41]++;
				wgStats[65]++;
			};
			wildnGameStats.wgHandsPlayed++;
			wgStats[28]++;
			wgStats[52]++;
			break;
	};
	localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
	stage.saveGame();
	//cupcake.updateCupcake('wildnGameStats', wildnGameStats);
	if(!canSubmit){
		nextSubmission--;
		if(nextSubmission === 0){
			canSubmit = true;
			//Mojo.Controller.errorDialog("You may now submit your score to the leaderboards!", this.controller.window);
		}
	}
};
WildngameAssistant.prototype.showScore = function(event, prize, money){
	updateScore = function(i){
		if (i >= 0){ //only update the score if you need to..
			pWait = Math.abs((i - money) * ( a / prize));
			scoreDigit1 = (i + "").charAt(0);
			document.getElementById("scoreDigit1div").innerHTML = '<img alt="" id="scoreDigit1" class="scoreDigit" src="images/menu/numbers/' + scoreDigit1 + shortcut1 + scoreDigitLeft1 + 'px;">';
			var scoreDigitArray = ["scoreDigit1"];
			var toIndex = i + "";
			switch (true){
				case(i>99999):
					scoreDigitArray[5] = "scoreDigit6";
					scoreDigit6 = (toIndex).charAt(5);
					document.getElementById("scoreDigit6div").innerHTML = '<img alt="" id="scoreDigit6" class="scoreDigit" src="images/menu/numbers/' + scoreDigit6 + shortcut1 + scoreDigitLeft6 + 'px;">';
				case (i>9999):
					scoreDigitArray[4] = "scoreDigit5";
					scoreDigit5 = (toIndex).charAt(4);
					document.getElementById("scoreDigit5div").innerHTML = '<img alt="" id="scoreDigit5" class="scoreDigit" src="images/menu/numbers/' + scoreDigit5 + shortcut1 + scoreDigitLeft5 + 'px;">';
				case (i>999):
					scoreDigitArray[3] = "scoreDigit4";
					scoreDigit4 = (toIndex).charAt(3);
					document.getElementById("scoreDigit4div").innerHTML = '<img alt="" id="scoreDigit4" class="scoreDigit" src="images/menu/numbers/' + scoreDigit4 + shortcut1 + scoreDigitLeft4 + 'px;">';
				case (i>99):
					scoreDigitArray[2] = "scoreDigit3";
					scoreDigit3 = (toIndex).charAt(2);
					document.getElementById("scoreDigit3div").innerHTML = '<img alt="" id="scoreDigit3" class="scoreDigit" src="images/menu/numbers/' + scoreDigit3 + shortcut1 + scoreDigitLeft3 + 'px;">';
				case (i>9):
					scoreDigitArray[1] = "scoreDigit2";
					scoreDigit2 = (toIndex).charAt(1);
					document.getElementById("scoreDigit2div").innerHTML = '<img alt="" id="scoreDigit2" class="scoreDigit" src="images/menu/numbers/' + scoreDigit2 + shortcut1 + scoreDigitLeft2 + 'px;">';
					break;
			};
			if (doScale){
				var x = scoreDigitArray.length - 1;
				do {
					document.getElementById(scoreDigitArray[x]).style.left = parseInt(document.getElementById(scoreDigitArray[x]).style.left) / scaleFactor + horizontalMargin + "px";
					document.getElementById(scoreDigitArray[x]).style.width = 26 / scaleFactor + "px";
					document.getElementById(scoreDigitArray[x]).style.height = 26 / scaleFactor + "px";
					document.getElementById(scoreDigitArray[x]).style.top = (69 + verticalMargin) / scaleFactor + "px";
				} while (x--);
			}
		};
	};
	moveScore = function(i){
		var x = 6;
		do{
			document.getElementById("scoreDigit" + x + "div").style.visibility = "hidden";
		} while (--x);
		x = (i + "").length;
		do{
			document.getElementById("scoreDigit" + (x) + "div").style.visibility = "visible";
		} while (--x);
		
		var tmp = i + "";
		var pushOver = tmp.length; //pushOver contains the number of digits in the new score..
		
		scoreDigitLeft1 = (430 + 17 * 1 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft2 = (430 + 17 * 2 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft3 = (430 + 17 * 3 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft4 = (430 + 17 * 4 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft5 = (430 + 17 * 5 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft6 = (430 + 17 * 6 - 17 * pushOver) + horizontalMargin;
		
		document.getElementById("score").style.left = (333 - 17 * pushOver) + horizontalMargin + "px";
		document.getElementById("score").style.marginLeft = "";
		if (doScale && !verticalMargin){
			scale(["score"], false, false, true, false);
		}
		document.getElementById("score").style.marginLeft = horizontalMargin + "px";
		
		document.getElementById("score").style.visibility = "visible";
		if(verticalMargin){
			document.getElementById("score").style.top = 69 + verticalMargin*2 + "px";
			scale(["score"], false, false);
			document.getElementById("score").style.top = parseInt(document.getElementById("score").style.top) + 1 + "px";
		}
	};
	var oldScore = money - prize;
	var a = 2800;
	var timeout;
	var i;
	console.log("Old Score: " + oldScore);
	console.log("Prize: " + prize);
	console.log("New Score: " + money);
	switch (true)
	{
		case (prize > 999):
			x = Math.round(prize / 1000);
			a = 14000 + 700 * x;
			setTimeout(function()
			{
				dontAllow = setTimeout(function()
				{
					dontAllow = false;
					document.getElementById("deal-bar").style.visibility = "visible";
				}, pWait);
			}, 10);
			break;
		case (prize > 499 && prize < 1000):
			x = Math.round(prize / 100);
			a = 5600 + 700 * x;
		case (prize > 99 && prize < 500):
			x = Math.round(prize / 100);
			a = 4200 + 700 * x;
			break;
	};
	switch (prize)
	{
		case (64000): case (40000):
			a = 180000;
			break;
		case (0):
			moveScore(money);
			p = (money+"").length;
			do{
				updateScore(money);
				moveScore(money);
			} while (--p);
			break;
	};
	switch (true)
	{
		case (prize<0):
			prize = Math.abs(prize);
			var p = prize;
			console.log("decreasing score...");
			do{
				i = money + p - 1;
				timeout = ( a / prize) * (oldScore - i);
				if((i + 1 + "").length != (i + "").length){
					setTimeout(moveScore.bind(this, i), timeout, i);
				};
				setTimeout(updateScore.bind(this, i), timeout, i);
			} while (--p);
			break;
		case (prize>0):
			setTimeout(this.payoutSound.bind(this), 100*z);
			if(prize>=500){
				setTimeout(this.payoutSound.bind(this), 100*z + 3000);
				if(prize>=1000){
					setTimeout(this.payoutSound.bind(this), 100*z + 6000);
					setTimeout(this.payoutSound.bind(this), 100*z + 9500);
				}
			}
			var p = prize;
			console.log("increasing score...");
			do{
				i = money - p + 1;
				timeout = (a / prize) * (i - oldScore);
				if((i - 1 + "").length != (i + "").length){
					setTimeout(moveScore.bind(this, i), timeout, i);
				};
				setTimeout(updateScore.bind(this, i), timeout, i);
			} while (--p);
			break;
	};
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	var thisRank;
		playingWildnGame ? thisRank = wgRankLevel : thisRank = bgRankLevel;
	var nextRank = rankList[thisRank];
	if(money >= nextRank){rankUp = true};
	if ((money <= 0 || (money < fastBet && playingWildnGame && money < minBet * 3)) || rankUp) {
		makeNew = true;
	};
	z = 0;
};
WildngameAssistant.prototype.newHand = function(event) {
	document.getElementById("winnerBar").style.visibility = "hidden";
	document.getElementById("winner").style.visibility = "hidden";
	var i = 5;
	do
	{
		document.getElementById("held" + i).style.visibility = "hidden";
		cardSuit[i - 1] = cardNumber[i - 1] = cardNumber2[i - 1] = cardSuit2[i - 1] = flipState[i - 1] = holdState[i - 1] = 0;
	} while (--i);
	isFlashing = didFlipAll = dontFlipDown = secondDeal = false;
	clearTimeout(t1);
	if (typeof(document.getElementById("winner").style.visibility) != "undefined") {
		document.getElementById("winner").style.visibility = "hidden";
	};
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	///YOU RAN OUT OF MONEY
	if (makeNew) {
		switch(rankUp){
			case true:
				this.lvlUpSound();
				setTimeout(function(){
					swapScene("stats");
				}, 700);
				break;
			case false:
				swapScene("stats");
				break;
		};
		return;
	};
	///MAKE A NEW GAME
	if (money < fastBet && money > 0)
	{
		betStatus = "fastBet";
		menuStatus = "bet";
		tBET = swapScene("menu");
		return;
	};
	this.refreshFlipState();
	if(autoDeal){dontAllow = true;}
	this.firstDeal();
	this.dealSound5();
	toDeal = 5;
//    playQueue.length > 5 ? loadSounds() : null;
};