
/*
 * 
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 * 
 */

function StatsAssistant(){
}

StatsAssistant.prototype.activate = function(){
	currentScene = "stats";
	if (reActivateIcons && betStatus != "bet") {bounceIcons()};
	markAppForeground();
	playingWildnGame === true ? document.getElementById("WGLAYOUT").style.visibility = "visible" : document.getElementById("BGLAYOUT").style.visibility = "visible";
	
	document.getElementById("mainMenuTitle").style.visibility = "hidden";
	document.getElementById(statsSmall[0]).style.visibility = "hidden";
	document.getElementById(statsLarge[1]).style.visibility = "hidden";
	document.getElementById(statsLarge[2]).style.visibility = "hidden";
	document.getElementById(statsLarge[3]).style.visibility = "hidden";
		document.getElementById(statsLarge[0]).style.left = 2 + "px";
		document.getElementById(statsSmall[1]).style.left = 163 + "px";
		document.getElementById(statsSmall[2]).style.left = 270 + "px";
		document.getElementById(statsSmall[3]).style.left = 376 + "px";
	document.getElementById(statsLarge[0]).style.visibility = "visible";
	document.getElementById(statsSmall[1]).style.visibility = "visible";
	document.getElementById(statsSmall[2]).style.visibility = "visible";
	document.getElementById(statsSmall[3]).style.visibility = "visible";
	
	this.flashStats();
	this.showStats();
	this.CURRENTnSMALL();
};
StatsAssistant.prototype.deactivate = function(){
	/*document.getElementById("TAPZONE-LARGE").removeEventListener('click', this.returnToMenu.bind(this));
	document.getElementById("CURRENTnSMALL").removeEventListener('click', this.CURRENTnSMALL.bind(this));
	document.getElementById("CURRENTpSMALL").removeEventListener('click', this.CURRENTpSMALL.bind(this));
	document.getElementById("ALL-TIMEnSMALL").removeEventListener('click', this.ALLTIMEnSMALL.bind(this));
	document.getElementById("ALL-TIMEpSMALL").removeEventListener('click', this.ALLTIMEpSMALL.bind(this));*/
	playingWildnGame === true ? document.getElementById("WGLAYOUT").style.visibility = "hidden" : document.getElementById("BGLAYOUT").style.visibility = "hidden";
	for (x = 0; x < statsLarge.length; x++){
		document.getElementById(statsLarge[x]).style.visibility  = document.getElementById(statsSmall[x]).style.visibility = "hidden";
	}
	document.getElementById("TAPZONE-LARGE").style.visibility = document.getElementById("TTC").style.visibility = "hidden";
	document.getElementById("mainMenuTitle").style.visibility = "visible";
	if (makeNew){
		makeNew = false;
		stage.createNewGame(this.controller);
	}
	allTime = percentages = false;
    clearTimeout(tO1); clearTimeout(tO2); clearTimeout(tO3); clearTimeout(tO4); clearTimeout(tO5); clearTimeout(pOt);
};
StatsAssistant.prototype.handleCommand = function (event) {
    if (event.type === Mojo.Event.back) {event.stop()}
};
StatsAssistant.prototype.showBackdrop = function(){
	document.getElementById("showBackdropDiv").innerHTML = '<img alt="" id="game" style="margin-top: ' + verticalMargin + 'px;" src="images/backdrops/backdrop' + gameBack + '.jpg">';
	document.getElementById("touchPadDiv").innerHTML = '<img alt="" id="game2" src="images/backdrops/backdrop' + gameBack + '.jpg" style="position:fixed; top:682px;">';
	document.getElementById("screwThis").style.backgroundImage = "url(images/backdrops/backdrop" + gameBack + ".png)";
	if(doScale) {
		scale(["game"], false);
		scale(["game2"], false, true, false, false);
	}
};
StatsAssistant.prototype.flashStats = function(event){
	document.getElementById("TTC").style.visibility === "visible" ?
		document.getElementById("TTC").style.visibility = "hidden" : document.getElementById("TTC").style.visibility = "visible";
	pOt = setTimeout(this.flashStats.bind(this), 1000);
};
StatsAssistant.prototype.showStats = function(){
	if (loadStats){loadStats = false};
	document.getElementById("STATSNUMBERS").innerHTML = "";
	document.getElementById("TAPZONE-LARGE").style.visibility = "visible";
	clearThese = new Array(0);
	STATS = [];
	divNumber = 10;
	var a = 0;
	var mod = 0;
	var itemTop = new Array (55,71,86, 118,132,148,164,180,196,211,227,242, 61,76, 110,126,141,157,172,188,204,219,235,250);
	if (typeof(allTime) === "undefined"){
		allTime = false;
		percentages = false;
	};
	if(playingWildnGame){
		if(!allTime){
			min=28;
			max=51;
		} else {
			min=52;
			max=75;
		};
	} else {
		if(!allTime){
			min=0;
			max=13;
		} else {
			min=14;
			max=27;
		};
	};
	var statsLoop;
	statsLoop = max - min + 1;
	do{
		var itemIndex = statsLoop - 1;
		switch (itemIndex){//RE-ORDER THE STATS SCREEN HERE.
			case 1://earnings
				itemIndex = 12;
				break;
			case 2://hands won
				itemIndex = 1;
				break;
			case 12://losses
				itemIndex = 13;
				break;
			case 13://hands lost
				itemIndex = 2;
				break;
			case 18://four of a kind
				itemIndex = 20;
				break;
			case 19://full house
				itemIndex = 18;
				break;
			case 20://wild flush
				itemIndex = 19;
				break;
		};
		var item = 0;
		item = wgStats[min + statsLoop - 1];
		var p = false;
		if(itemIndex>0 && percentages){
			if(itemIndex==1||itemIndex==2){
				if (wgStats[min] != 0) {
					item = 100 * (Math.round((item / (wgStats[min])) * Math.pow(10, 3)) / Math.pow(10, 3)) + "";
					item = Math.round(item*100)/100;
				};
				p = true;
			} else if (itemIndex != 12 && itemIndex != 13){
				if (wgStats[(min + 2)] != 0) {
					item = 100 * (Math.round((item / (wgStats[(min + 2)])) * Math.pow(10, 3)) / Math.pow(10, 3)) + "";
					item = Math.round(item*100)/100;
				};
				p = true;
			};
		};
		item = item + "";
		var itemLength = item.length;
		do{
			i = itemLength - 1;
			var number = item[i];
			var t = itemTop[(itemIndex)];
			t = t + 5;
			if(itemIndex<12){
				var left = 172 + 9*i;
				t = t + 4;
			} else {
				var left = 401 + 9*i;
				t = t - 2;
				if (itemIndex > 13) {
					t = t + 7;
				};
			};
			switch (true){
				case (itemIndex==12||itemIndex==13):
					left = left - 54;
					break;
				case (itemIndex==0||itemIndex==1||itemIndex==2):
					left = left - 16;
					break;
			};
			if(!playingWildnGame){
				if(itemIndex>2&&itemIndex<12){
					left = left + 150;
				};
			}
			if(number === "."){
				number = "P";
			};
			left = left + horizontalMargin;
            STATS.push('<img alt="" id="stats' + divNumber + '" src="images/menu/numbers/' + number + '.png" style="margin-top: '+ verticalMargin + 'px; top:' + t + 'px; left:' + left + 'px; width:14px; height:14px; position:fixed; z-index:11;" //>');

			clearThese.push("stats" + divNumber);
			divNumber++;
			if(i == item.length - 1 && p){
				left = left + 11;
				STATS.push('<img alt="" id="stats' + divNumber + '" src="images/menu/numbers/PCT.png" style="margin-top: '+verticalMargin + 'px; top:' + t + 'px; left:' + left + 'px; width:17px; height:14px; position:fixed; z-index:11;" //>');
				
				clearThese.push("stats" + divNumber);
				divNumber++;
			}
		} while (--itemLength);
	} while (--statsLoop);
	STATS = STATS.join("");
	
	document.getElementById("STATSNUMBERS").innerHTML = STATS;
	document.getElementById("STATSNUMBERS").style.visibility = "visible";
	if (doScale) {
		scale(clearThese);
	}
	if(horizontalMargin){
		for(x=0;x<clearThese.length;x++){
			document.getElementById(clearThese[x]).style.marginLeft = + horizontalMargin + 'px';
		}
	}
};
StatsAssistant.prototype.returnToMenu = function(event){
	clearTimeout(pOt);
	menuStatus = "sub";
	switch(rankUp){
		case true:
			rankUp = false;
			makeNew = false;
			playingWildnGame ? wgRankLevel++ : bgRankLevel++;
			stage.createNewGame();
			if (tStats === 0) {
				playingWildnGame === true ? document.getElementById("WGLAYOUT").style.visibility = "hidden" : document.getElementById("BGLAYOUT").style.visibility = "hidden";
				document.getElementById("TAPZONE-LARGE").style.visibility = "hidden";
				document.getElementById("TTC").style.visibility = "hidden";
//				document.getElementById("STATSTITLE").style.visibility = "visible";
				var i = 4;
				do{
					document.getElementById(statsSmall[i - 1]).style.visibility = "hidden";
					document.getElementById(statsLarge[i - 1]).style.visibility = "hidden";
				} while (--i);
				var erase = clearThese.length;
				do{
					document.getElementById(clearThese[erase - 1]).style.visibility = "hidden";
				} while (--erase);
				this.showNextRank();
				document.getElementById("RANKLG").style.visibility = "visible";
				document.getElementById("NEXTLG").style.visibility = "visible";
				var controller = this.controller;
				tStats = setTimeout(function(controller){
					var lastController = controller;
					swapScene("wildngame");
					document.getElementById("RANKLG").style.visibility = "hidden";
					document.getElementById("NEXTLG").style.visibility = "hidden";
					document.getElementById("STATSNUMBERS").innerHTML = "";
				}, 2500);
			}
			canSubmit = true;
			nextSubmission = 0;
			break;
		case false:
			document.getElementById("STATSNUMBERS").innerHTML = "";
			swapScene("menu");
			break;
	};
};
StatsAssistant.prototype.showNextRank = function(){
	//Mojo.Log.info("HAHAHA");
	var thisRank;
		playingWildnGame ? thisRank = wgRankLevel : thisRank = bgRankLevel;
	var nextRank = rankList[thisRank];
	var rankLoop = 2;
	var divNumber = 10;
	var STATS = [];
	clearThese = [];
	do{
		var item = 0;
		switch (rankLoop) {
			case 1:
				item = thisRank;
				break;
			case 2:
				item = nextRank;
				break;
		};
		item = item + "";
		var itemLength = item.length;
		do{
			i = itemLength - 1;
			var number = item[i];
			switch (rankLoop){
				case 1:
					var top = 123;
					var left = 280 + 20*i;
					break;
				case 2:
					var top = 187;
					var left = 263 + 20*i;
					break;
			};
			
			left = left + horizontalMargin;
			top = top + verticalMargin;
            STATS.push('<img alt="" id="stats' + divNumber + '" src="images/menu/numbers/' + number + '.png" style="top:' + top + 'px; left:' + left + 'px; width:' + 30 + 'px; height:' + 30 + 'px; position:fixed;">');
			
			clearThese.push("stats" + divNumber);
			divNumber++;
		} while (--itemLength);
	} while (--rankLoop);
	STATS = STATS.join("");
	console.log(STATS)
	document.getElementById("STATSNUMBERS").innerHTML = STATS;
	document.getElementById("STATSNUMBERS").style.visibility = "visible";
	if (doScale) {
		scale(clearThese);
	}
	if(horizontalMargin){
		for(x=0;x<clearThese.length;x++){
			document.getElementById(clearThese[x]).style.marginLeft = + horizontalMargin + 'px';
		}
	}
};
StatsAssistant.prototype.changeStats = function(){
	document.getElementById("STATSNUMBERS").innerHTML = "";
	this.showStats();
	if (doScale) {
		scale(statsSmall, false, false, true, false);
		scale(statsLarge, false, false, true, false);
	}
};
StatsAssistant.prototype.CURRENTnSMALL = function(event){
	document.getElementById(statsLarge[0]).style.left = 2  + "px";
	document.getElementById(statsSmall[1]).style.left = 163  + "px";
	document.getElementById(statsSmall[2]).style.left = 270  + "px";
	document.getElementById(statsSmall[3]).style.left = 376  + "px";
		document.getElementById(statsSmall[0]).style.visibility = "hidden";
		document.getElementById(statsLarge[1]).style.visibility = "hidden";
		document.getElementById(statsLarge[2]).style.visibility = "hidden";
		document.getElementById(statsLarge[3]).style.visibility = "hidden";
	document.getElementById(statsLarge[0]).style.visibility = "visible";
	document.getElementById(statsSmall[1]).style.visibility = "visible";
	document.getElementById(statsSmall[2]).style.visibility = "visible";
	document.getElementById(statsSmall[3]).style.visibility = "visible";
		percentages = false;
		allTime = false;
	this.changeStats();
};
StatsAssistant.prototype.CURRENTpSMALL = function(event){
	document.getElementById(statsSmall[0]).style.left = 2  + "px";
	document.getElementById(statsLarge[1]).style.left = 108  + "px";
	document.getElementById(statsSmall[2]).style.left = 270  + "px";
	document.getElementById(statsSmall[3]).style.left = 376  + "px";
		document.getElementById(statsLarge[0]).style.visibility = "hidden";
		document.getElementById(statsSmall[1]).style.visibility = "hidden";
		document.getElementById(statsLarge[2]).style.visibility = "hidden";
		document.getElementById(statsLarge[3]).style.visibility = "hidden";
	document.getElementById(statsSmall[0]).style.visibility = "visible";
	document.getElementById(statsLarge[1]).style.visibility = "visible";
	document.getElementById(statsSmall[2]).style.visibility = "visible";
	document.getElementById(statsSmall[3]).style.visibility = "visible";
		percentages = true;
		allTime = false;
	this.changeStats();
};
StatsAssistant.prototype.ALLTIMEnSMALL = function(event){
	document.getElementById(statsSmall[0]).style.left = 2  + "px";
	document.getElementById(statsSmall[1]).style.left = 108  + "px";
	document.getElementById(statsLarge[2]).style.left = 215  + "px";
	document.getElementById(statsSmall[3]).style.left = 376  + "px";
		document.getElementById(statsLarge[0]).style.visibility = "hidden";
		document.getElementById(statsLarge[1]).style.visibility = "hidden";
		document.getElementById(statsLarge[3]).style.visibility = "hidden";
		document.getElementById(statsSmall[2]).style.visibility = "hidden";
	document.getElementById(statsSmall[0]).style.visibility = "visible";
	document.getElementById(statsSmall[1]).style.visibility = "visible";
	document.getElementById(statsLarge[2]).style.visibility = "visible";
	document.getElementById(statsSmall[3]).style.visibility = "visible";
		percentages = false;
		allTime = true;
	this.changeStats();
};
StatsAssistant.prototype.ALLTIMEpSMALL = function(event){
	document.getElementById(statsSmall[0]).style.left = 2  + "px";
	document.getElementById(statsSmall[1]).style.left = 108  + "px";
	document.getElementById(statsSmall[2]).style.left = 215  + "px";
	document.getElementById(statsLarge[3]).style.left = 321  + "px";
		document.getElementById(statsLarge[0]).style.visibility = "hidden";
		document.getElementById(statsLarge[1]).style.visibility = "hidden";
		document.getElementById(statsLarge[2]).style.visibility = "hidden";
		document.getElementById(statsSmall[3]).style.visibility = "hidden";
	document.getElementById(statsLarge[3]).style.visibility = "visible";
	document.getElementById(statsSmall[0]).style.visibility = "visible";
	document.getElementById(statsSmall[1]).style.visibility = "visible";
	document.getElementById(statsSmall[2]).style.visibility = "visible";
		percentages = true;
		allTime = true;
	this.changeStats();
};