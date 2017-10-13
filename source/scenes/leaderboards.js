/*
 *
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 *
 */

function LeaderboardsAssistant() {
}

LeaderboardsAssistant.prototype.activate = function(event) {
	document.getElementById("leadersScroller").style.zIndex = 10;
	document.getElementById(this.prior).style.visibility = "visible";
	this.changeDuration("all");
	currentScene = "leaderboards";
};
LeaderboardsAssistant.prototype.deactivate = function(event) {
	document.getElementById("leadersScroller").style.zIndex = -1;
	//	document.getElementById("submitZone").removeEventListener("click", this.submitScore_.bind(this));
	//	document.getElementById("nextLeaderboard").removeEventListener("click", this.nextLeaderboard_.bind(this));
	//	document.getElementById("lastLeaderboard").removeEventListener("click", this.lastLeaderboard_.bind(this));
};
LeaderboardsAssistant.prototype.cleanup = function(event) {
	isLeaderboardsOpen = false;
	checkVilloStatus();
	//document.removeEventListener(this.controller.window, 'resize', this.resizeee, false);
};
LeaderboardsAssistant.prototype.nextLeaderboard = function(event) {
	switch (this.prior) {
		case "all":
			this.changeDuration("latest");
			break;
		case "latest":
			this.changeDuration("month");
			break;
		case "month":
			this.changeDuration("today");
			break;
		case "today":
			this.changeDuration("all");
			break;
	}
};
LeaderboardsAssistant.prototype.lastLeaderboard = function(event) {
	switch (this.prior) {
		case "all":
			this.changeDuration("today");
			break;
		case "latest":
			this.changeDuration("all");
			break;
		case "month":
			this.changeDuration("latest");
			break;
		case "today":
			this.changeDuration("month");
			break;
	}
};
LeaderboardsAssistant.prototype.submitScore = function() {
	//wgScore = (wgRank * wgHandsWon * wgTotalEarnings) / wgHandsLost;
	//rank * wins + rank * earnings
	document.getElementById("submitZone").style.visibility = "hidden";
	window.setTimeout(this.showSubmitZone.bind(this), 700);
	switch (canSubmit) {
		case false:
			//Mojo.Controller.errorDialog("Cannot submit at this time. You may submit every 250 hands, or after your rank increases.", this.controller.window);
			break;
		case true:
			var wgScore = wgRankLevel * wgStats[54] + wgRankLevel * wgStats[53];
			wgScore = Math.round(wgScore * 100) / 100;
			var bgScore = bgRankLevel * wgStats[16] + bgRankLevel * wgStats[15];
			bgScore = Math.round(bgScore * 100) / 100;
			globalScore = wgScore + bgScore;
			console.log("SCORE: " + globalScore);
			villo.leaders.submit({
				score : globalScore,
				callback : this.scoreAdded.bind(this)
			});
			break;
	}
};
LeaderboardsAssistant.prototype.showSubmitZone = function() {
	document.getElementById("submitZone").style.visibility = "visible";
};
LeaderboardsAssistant.prototype.changeDuration = function(duration) {
	document.getElementById("all").style.visibility = "hidden";
	document.getElementById("latest").style.visibility = "hidden";
	document.getElementById("month").style.visibility = "hidden";
	document.getElementById("today").style.visibility = "hidden";
	document.getElementById(duration).style.visibility = "visible";
	this.prior = duration;
	villo.leaders.get({
		duration : duration,
		callback : this.showLeaders.bind(this)
	});
};
LeaderboardsAssistant.prototype.showLeaders = function(response, event) {
	if(response.leaders) {
		this.displayScroller(response.leaders);
	} else {
		this.displayScroller([{
			"username" : "No scores.",
			"data" : ""
		}]);
		//Mojo.Controller.errorDialog("Error loading leaderboard.", this.controller.window)
	}
};
LeaderboardsAssistant.prototype.scoreAdded = function() {
	//Alert
	/*this.controller.showAlertDialog({
	onChoose : function(value) {
	if(value == "ok") {
	//Do nothing
	} else {
	//Also do nothing
	}
	},
	title : $L("Score Submitted!"),
	message : $L("Your score has been submitted!"),
	choices : [{
	label : $L('Okay'),
	value : "ok"
	}]
	});*/
	//Update
	this.changeDuration(this.prior);
	nextSubmission = 250;
	canSubmit = false;
	stage.saveOptions();
};

LeaderboardsAssistant.prototype.resizeee = function(event) {
	var heightChange = (480 / scaleFactor - window.innerHeight);
	var leadersScrollerTop = 89 / scaleFactor;
	var leadersScroller = 342 / scaleFactor - heightChange;
	var submitNew = 445 / scaleFactor - heightChange;

	var submitZone = submitNew - 11 / scaleFactor;
	document.getElementById("leadersScroller").style.top = leadersScrollerTop + verticalMargin + "px";
	document.getElementById("leadersScroller").style.height = leadersScroller - verticalMargin + "px";
	document.getElementById("submitNew").style.top = submitNew - verticalMargin/2 + "px";
	document.getElementById("submitZone").style.top = submitNew - verticalMargin/2 + "px";
};
LeaderboardsAssistant.prototype.displayScroller = function(scrollArray) {
	/*
	 * takes an array
	 * puts it in a scrolling list
	 * via this template
	 * yeah awesome
	 */

	document.getElementById("leaderList").innerHTML = "";
	var scrollerScale = scaleFactor;

	//<div class="categoryItem2" x-mojo-touch-feedback="momentary"><div class="">#{-username}</div>
	//<div class="" style="float:right; font-size: 43.2px;margin-top: -64.8px; color: #3b3b3b">#{-data}</div></div>

	for(i in scrollArray) {
		var item = scrollArray[i];
		var stylin = 'margin:' + 10 / scaleFactor + 'px;padding:' + 7 / scaleFactor + 'px;font-size:' + 24 / scaleFactor + 'px;-webkit-border-radius:' + 5 / scaleFactor + 'px;';
		var piece = '<div class="categoryItem2" style="' + stylin + '"><div class="">' + item.username + '</div><div class="" style="float:right; font-size: ' + 18 / scaleFactor + 'px;margin-top:' + -25 / scaleFactor + 'px; color: #3b3b3b">' + item.data + '</div></div>';

		document.getElementById("leaderList").innerHTML += piece;
		//console.log(piece);
	}
	document.getElementById("leaderList").innerHTML += "<br />";
	leadersScroller.refresh();
};
LeaderboardsAssistant.prototype.handleCommand = function(event) {
	if(event.type === Mojo.Event.back) {
		this.lastLeaderboard();
	}
	if(event.type === Mojo.Event.forward) {
		this.nextLeaderboard();
	}
	event.stop();
};
LeaderboardsAssistant.prototype.back = function() {
	this.deactivate();
	this.cleanup();
	swapScene("menu");
};
