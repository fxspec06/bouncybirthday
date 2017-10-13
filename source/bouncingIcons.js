function bounceIcons(){
	moveSuits1();
	moveSuits2();
	moveSuits3();
	moveSuits4();
	moveSuits5();
	var suits = ["hearts", "diamonds", "clubs", "spades"];
	var i = 3;
	do {
		document.getElementById(suits[i]).style.visibility = "visible";
	} while (i--);
};
function moveSuits1(){
	frame();
	tO1 = window.setTimeout(moveSuits1.bind(this), speed);
};
function moveSuits2(){
	frame();
	tO2 = window.setTimeout(moveSuits2.bind(this), speed);
};
function moveSuits3(){
	frame();
	tO3 = window.setTimeout(moveSuits3.bind(this), speed);
};
function moveSuits4(){
	frame();
	tO4 = window.setTimeout(moveSuits4.bind(this), speed);
};
function moveSuits5(){
	frame();
	tO5 = window.setTimeout(moveSuits5.bind(this), speed);
};
function frame(){
	flag = false;
	cycle = false;
	skipRest = false;
	c = 1;
	loadClubs();
	loadSpades();
	checkCollission();
	if (collide) {
		if (collideW) {
			invertClubsX();
			invertSpadesX();
		}
		if (collideH) {
			invertClubsY();
			invertSpadesY();
		}
		skipRest = true;
	}
	checkEdges();
	if (collideE) {
		if (collideEW) {
			invertClubsX();
		}
		if (collideEH) {
			invertClubsY();
		}
		if (collideew) {
			invertSpadesX();
		}
		if (collideeh) {
			invertSpadesY();
		}
		skipRest = true;
	}
	if(!skipRest||(cycleTry1&&!cycleTry2)){
		loadDiamonds();
		checkCollission();
		if (collide) {
			if (collideW) {
				invertClubsX();
				invertDiamondsX();
			}
			if (collideH) {
				invertClubsY();
				invertDiamondsY();
			}
			skipRest = true;
		}
		checkEdges();
		if (collideE) {
			if (collideEW) {
				invertClubsX();
			}
			if (collideEH) {
				invertClubsY();
			}
			if (collideew) {
				invertDiamondsX();
			}
			if (collideeh) {
				invertDiamondsY();
			}
			skipRest = true;
		}
		c++;
	}
	if(!skipRest||(cycleTry1&&!cycleTry2)){
		loadHearts();
		checkCollission();
		if (collide) {
			if (collideW) {
				invertClubsX();
				invertHeartsX();
			}
			if (collideH) {
				invertClubsY();
				invertHeartsY();
			}
			skipRest = true;
		}
		checkEdges();
		if (collideE) {
			if (collideEW) {
				invertClubsX();
			}
			if (collideEH) {
				invertClubsY();
			}
			if (collideew) {
				invertHeartsX();
			}
			if (collideeh) {
				invertHeartsY();
			}
			skipRest = true;
		}
		c++;
	}
	if(!skipRest||(cycleTry1&&!cycleTry2)){
		loadSpades2();
		loadDiamonds();
		checkCollission();
		if (collide) {
			if (collideW) {
				invertSpadesX();
				invertDiamondsX();
			}
			if (collideH) {
				invertSpadesY();
				invertDiamondsY();
			}
			skipRest = true;
		}
		checkEdges();
		if (collideE) {
			if (collideEW) {
				invertSpadesX();
			}
			if (collideEH) {
				invertSpadesY();
			}
			if (collideew) {
				invertDiamondsX();
			}
			if (collideeh) {
				invertDiamondsY();
			}
			skipRest = true;
		}
		c++;
	}
	if(!skipRest||(cycleTry1&&!cycleTry2)){
		loadHearts();
		checkCollission();
		if (collide) {
			if (collideW) {
				invertSpadesX();
				invertHeartsX();
			}
			if (collideH) {
				invertSpadesY();
				invertHeartsY();
			}
			skipRest = true;
		}
		checkEdges();
		if (collideE) {
			if (collideEW) {
				invertSpadesX();
			}
			if (collideEH) {
				invertSpadesY();
			}
			if (collideew) {
				invertHeartsX();
			}
			if (collideeh) {
				invertHeartsY();
			}
			skipRest = true;
		}
		c++;
	}
	if(!skipRest||(cycleTry1&&!cycleTry2)){
		loadDiamonds2();
		checkCollission();
		if (collide) {
			if (collideW) {
				invertDiamondsX();
				invertHeartsX();
			}
			if (collideH) {
				invertDiamondsY();
				invertHeartsY();
			}
			skipRest = true;
		}
		checkEdges();
		if (collideE) {
			if (collideEW) {
				invertDiamondsX();
			}
			if (collideEH) {
				invertDiamondsY();
			}
			if (collideew) {
				invertHeartsX();
			}
			if (collideeh) {
				invertHeartsY();
			}
			skipRest = true;
		}
		c++;
	}
	if (!skipRest) {/////////END OF NORMAL CYCLE. ONLY EXECUTED UPON FREE PASS THROUGH.//////////
		increaseDistance();
		cycle = true;
		if(cycleTry1){
			cycleTry1 = false;
			if(cycleTry2){
				cycleTry2 = false;
				if(logThis){
					logThis = false;
					if (typeof(fatal) != "undefined" && fatal === true) {
						fatal = false;
					};
				};
			};
		};
	};
	if (!cycle && cycleTry1 && cycleTry2 && logThis){
		fatal = true;
	};
	if (!cycle && cycleTry1 && cycleTry2) {///ATTEMPT AUTO FIX...
		i = 1;
		switch (c){
			case 1:
				if(spades[0]<clubs[0]){
					i=-1;
				};
				spades[2] = i*-1;
				clubs[2] = i;
				if(logThis){invertClubsX();};///BRUTE FORCE FIX.
				i=1;
				if(spades[1]<clubs[1]){
					i=-1;
				};
				spades[3] = i*-1;
				clubs[3] = i;
				if(logThis){invertClubsY();};///BRUTE FORCE FIX.
				break;
			case 2:
				if(diamonds[0]<clubs[0]){
					i=-1;
				};
				diamonds[2] = i*-1;
				clubs[2] = i;
				if(logThis){invertClubsX();};
				i=1;
				if(diamonds[1]<clubs[1]){
					i=-1;
				};
				diamonds[3] = i*-1;
				clubs[3] = i;
				if(logThis){invertClubsX();};
				break;
			case 3:
				if(hearts[0]<clubs[0]){
					i=-1;
				};
				hearts[2] = i*-1;
				clubs[2] = i;
				if(logThis){invertClubsX();};
				i=1;
				if(hearts[1]<clubs[1]){
					i=-1;
				};
				hearts[3] = i*-1;
				clubs[3] = i;
				if(logThis){invertClubsY();};
				break;
			case 4:
				if(diamonds[0]<spades[0]){
					i=-1;
				};
				diamonds[2] = i*-1;
				spades[2] = i;
				i=1;
				if(logThis){invertDiamondsX();};
				if(diamonds[1]<spades[1]){
					i=-1;
				};
				diamonds[3] = i*-1;
				spades[3] = i;
				if(logThis){invertDiamondsY();};
				break;
			case 5:
				if(hearts[0]<spades[0]){
					i=-1;
				};
				hearts[2] = i*-1;
				spades[2] = i;
				if(logThis){invertSpadesX();};
				i=1;
				if(hearts[1]<spades[1]){
					i=-1;
				};
				hearts[3] = i*-1;
				spades[3] = i;
				if(logThis){invertSpadesY();};
				break;
			case 6:
				if(hearts[0]<diamonds[0]){
					i=-1;
				};
				hearts[2] = i*-1;
				diamonds[2] = i;
				if (logThis) {
					invertDiamondsX();
				};
				i=1;
				if(hearts[1]<diamonds[1]){
					i=-1;
				};
				hearts[3] = i*-1;
				diamonds[3] = i;
				if (logThis) {
					invertDiamondsY();
				};
				break;
		};
		logThis = true;
	};
	if(!cycle&&cycleTry1){
		cycleTry2 = true;
	};
	if (!cycle){
		cycleTry1 = true;
	};
};
//////////////////////////////BEGINNING OF FUNCTIONS NEEDED FOR CYCLE...//////////////////////////////
increaseDistance = function(){
	spades[0] = spades[0] + spades[2];
	spades[1] = spades[1] + spades[3];
	diamonds[0] = diamonds[0] + diamonds[2];
	diamonds[1] = diamonds[1] + diamonds[3];
	hearts[0] = hearts[0] + hearts[2];
	hearts[1] = hearts[1] + hearts[3];
	clubs[0] = clubs[0] + clubs[2];
	clubs[1] = clubs[1] + clubs[3];
	document.getElementById("hearts").style.left = hearts[0]  + "px";
	document.getElementById("hearts").style.top = hearts[1]  + "px";
	document.getElementById("spades").style.left = spades[0]  + "px";
	document.getElementById("spades").style.top = spades[1]  + "px";
	document.getElementById("diamonds").style.left = diamonds[0]  + "px";
	document.getElementById("diamonds").style.top = diamonds[1]  + "px";
	document.getElementById("clubs").style.left = clubs[0]  + "px";
	document.getElementById("clubs").style.top = clubs[1]  + "px";
	flag = true;
};
invertClubsX = function(){
	clubs[2] == 1 ? clubs[2] = -1 : clubs[2] = 1;
	clubs[0] = clubs[0] + clubs[2];
};
invertClubsY = function(){
	clubs[3] == 1 ? clubs[3] = -1 : clubs[3] = 1;
	clubs[1] = clubs[1] + clubs[3];
};
invertSpadesX = function(){
	spades[2] == 1 ? spades[2] = -1 : spades[2] = 1;
	spades[0] = spades[0] + spades[2];
};
invertSpadesY = function(){
	spades[3] == 1 ? spades[3] = -1 : spades[3] = 1;
	spades[1] = spades[1] + spades[3];
};
invertHeartsX = function(){
	hearts[2] == 1 ? hearts[2] = -1 : hearts[2] = 1;
	hearts[0] = hearts[0] + hearts[2];
};
invertHeartsY = function(){
	hearts[3] == 1 ? hearts[3] = -1 : hearts[3] = 1;
	hearts[1] = hearts[1] + hearts[3];
};
invertDiamondsX = function(){
	diamonds[2] == 1 ? diamonds[2] = -1 : diamonds[2] = 1;
	diamonds[0] = diamonds[0] + diamonds[2];
};
invertDiamondsY = function(){
	diamonds[3] == 1 ? diamonds[3] = -1 : diamonds[3] = 1;
	diamonds[1] = diamonds[1] + diamonds[3];
};
loadClubs = function(){
	X = clubs[0];
	Y = clubs[1];
	W = 60 / scaleFactor
	H = 62 / scaleFactor
	XD = clubs[2];
	YD = clubs[3];
};
loadSpades = function(){
	exxx = spades[0];
	whyyyyyy = spades[1];
	doubleyou = 48 / scaleFactor
	aaytchhh = 58 / scaleFactor
	xd = spades[2];
	yd = spades[3];
};
loadSpades2 = function(){
	X = spades[0];
	Y = spades[1];
	W = 48 / scaleFactor
	H = 58 / scaleFactor
	XD = spades[2];
	YD = spades[3];
};
loadDiamonds = function(){
	exxx = diamonds[0];
	whyyyyyy = diamonds[1];
	doubleyou = 46 / scaleFactor
	aaytchhh = 60 / scaleFactor
	xd = diamonds[2];
	yd = diamonds[3];
};
loadHearts = function(){
	exxx = hearts[0];
	whyyyyyy = hearts[1];
	doubleyou = 48 / scaleFactor
	aaytchhh = 58 / scaleFactor
	xd = hearts[2];
	yd = hearts[3];
};
loadDiamonds2 = function(){
	X = diamonds[0];
	Y = diamonds[1];
	W = 46/ scaleFactor
	H = 60/ scaleFactor
	XD = diamonds[2];
	YD = diamonds[3];
};
checkCollission = function(){ // check collision
	collideW = false;
	collideH = false;
	collide = false;
	if (Y - whyyyyyy <= H && X - exxx <= W && exxx - X <= doubleyou && whyyyyyy - Y <= aaytchhh) {
		collide = true;
		if (XD != xd) {
			collideW = true;
		};
		if (YD != yd) {
			collideH = true;
		};
	};
};
checkEdges = function(){
	collideE = false;
	collideEW = false;
	collideEH = false;
	collideew = false;
	collideeh = false;
	
	if(X <= W - simplify1 && XD == -1 || X >= simplify1 - W + test2 && XD == 1){
		collideEW = true;
		collideE = true;
	}
	if(Y <= H - test1 && YD == -1 || Y >= simplify1 - H + simplify3 && YD == 1){
		collideEH = true;
		collideE = true;
	}
	if(exxx <= doubleyou - simplify1 && xd == -1 || exxx >= simplify1 - doubleyou + test2 && xd == 1){
		collideew = true;
		collideE = true;
	}
	if(whyyyyyy <= aaytchhh - test1 && yd == -1 || whyyyyyy >= simplify1 - aaytchhh + simplify3 && yd == 1){
		collideeh = true;
		collideE = true;
	}
};
/////////////////////////////END OF FUNCTIONS NEEDED FOR CYCLE//////////////////////