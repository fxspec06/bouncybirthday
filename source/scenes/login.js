/*
 *
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 *
 */

function LoginAssistant(menuArguments) {
	this.menuArguments = menuArguments;
}

LoginAssistant.prototype.activate = function(args) {
	this.menuArguments = args;
	currentScene = "login";
	this.didSwitch = false;
	didOpenVillo = true;
	isLoginOpen = true;
	document.getElementById("username").style.visibility = "visible";
	document.getElementById("password").style.visibility = "visible";
	document.getElementById("password").focus();
	document.getElementById("username").focus();
	document.getElementById("username").blur();
	document.getElementById("mainMenuTitle").style.visibility = "hidden";
	document.getElementById("hearts").style.visibility = "hidden";
	document.getElementById("clubs").style.visibility = "hidden";
	document.getElementById("diamonds").style.visibility = "hidden";
	document.getElementById("spades").style.visibility = "hidden";
	this.switchLayoutBack();
	if(this.menuArguments) {
		this.switchLayout();
	}
};
LoginAssistant.prototype.deactivate = function(event) {
	document.getElementById("rememberBox").removeEventListener(upEvent, this.loginToggle.bind(this));
	document.getElementById("username").removeEventListener("change", this.differentUser.bind(this));
	document.getElementById("password").removeEventListener("change", this.loginTry.bind(this));
	document.getElementById("regEmail").removeEventListener("change", this.registerTry.bind(this));
	this.cleanup();
};
LoginAssistant.prototype.cleanup = function(event) {
	isLoginOpen = false;
	if(!didLogIn) {
		didOpenVillo = false;
		isLeaderboardsOpen = false;
		isOceanChatOpen = false;
		isSkyChatOpen = false;
		rememberLogin = false;
	}
	stage.saveLoginInfo();
	checkVilloStatus();
};
LoginAssistant.prototype.focus = function(event) {
	var targetID = event.target.id;
	var test;
	switch(targetID) {
		case "password":
			document.getElementById(targetID).type = "password";
		case "username":
			test = targetID;
			break;
		case "regUsername":
			test = "username";
			break;
		case "regPassword1":
			document.getElementById(targetID).type = "password";
			test = "password";
			break;
		case "regPassword2":
			document.getElementById(targetID).type = "password";
			test = "confirm password";
			break;
		case "regEmail":
			test = "email";
			break;
	}
	if(document.getElementById(targetID).value == test) {
		document.getElementById(targetID).value = "";
	}
};
LoginAssistant.prototype.blur = function(event) {
	var targetID = event.target.id;
	var test;
	if(document.getElementById(targetID).value == "") {
		switch(targetID) {
			case "password":
				document.getElementById(targetID).type = "text";
			case "username":
				test = targetID;
				break;
			case "regUsername":
				test = "username";
				break;
			case "regPassword1":
				document.getElementById(targetID).type = "text";
				test = "password";
				break;
			case "regPassword2":
				document.getElementById(targetID).type = "text";
				test = "confirm password";
				break;
			case "regEmail":
				test = "email";
				break;
		}
		document.getElementById(targetID).value = test;
	}
	if(deviceType == "iOS"){
        document.location = "wildnpoker:" + "blurevent:";
    }
};
LoginAssistant.prototype.loginToggle = function(event) {
	if(rememberLogin === true) {
		rememberLogin = false;
		document.getElementById("rememberBoxDiv").innerHTML = '<img id="rememberBox" alt="" src="images/villo/CHECKBOX-OFF.png" />';
	} else {
		rememberLogin = true;
		document.getElementById("rememberBoxDiv").innerHTML = '<img id="rememberBox" alt="" src="images/villo/CHECKBOX-ON.png" />';
	}
	if(doScale) {
		document.getElementById("rememberBox").style.marginLeft = horizontalMargin * 2 + "px";
		scale(["rememberBox"]);
	}
	this.resize();
	document.getElementById("rememberBox").addEventListener(upEvent, this.loginToggle.bind(this));
	stage.saveLoginInfo();
};
LoginAssistant.prototype.differentUser = function(event) {
	rememberLogin = false;
	document.getElementById("rememberBoxDiv").innerHTML = '<img id="rememberBox" alt="" src="images/villo/CHECKBOX-OFF.png" />';
	newUser = true;
	if(doScale && !verticalMargin) {
		scale(["rememberBox"], true, true, true, false);
		this.resize();
		document.getElementById("rememberBox").style.marginLeft = 160 / scaleFactor + "px";
	}
};
LoginAssistant.prototype.resize = function(event) {
	if(didLogIn) {
		return
	}
	var heightChange = (480 / scaleFactor - window.innerHeight);
	var regMod = window.innerHeight < 480 ? -25 : 0;

	document.getElementById("VILLO-LOGO").style.top = 100 / scaleFactor - heightChange + "px";
	document.getElementById("loginWrapper").style.top = 325 / scaleFactor - heightChange + "px";
	document.getElementById("registerWrapper").style.top = (325 + regMod) / scaleFactor - heightChange + "px";

	document.getElementById("loginBtn").style.top = 408 / scaleFactor - heightChange + "px";
	document.getElementById("registerBtn").style.top = 450 / scaleFactor - heightChange + "px";
	document.getElementById("doRegister").style.top = 450 / scaleFactor - heightChange + "px";

	document.getElementById("rememberBox").style.top = 397 / scaleFactor - heightChange + "px";
};
LoginAssistant.prototype.switchLayout = function() {
	this.didSwitch = true;
	document.getElementById("username").style.visibility = "hidden";
	document.getElementById("password").style.visibility = "hidden";
	document.getElementById("rememberBox").style.visibility = "hidden";
	document.getElementById("regUsername").style.visibility = "visible";
	document.getElementById("regPassword1").style.visibility = "visible";
	document.getElementById("regPassword2").style.visibility = "visible";
	document.getElementById("regEmail").style.visibility = "visible";
	document.getElementById("loginBtn").style.visibility = "hidden";
	document.getElementById("registerBtn").style.visibility = "hidden";
	document.getElementById("doRegister").style.visibility = "visible";
	//document.getElementById("VILLO-LOGO").style.backgroundImage = "url(images/villo/logo-small-vertical.png)";
};
LoginAssistant.prototype.loginTry = function(event) {
	if(rememberLogin && villo.user.isLoggedIn() && !newUser) {
		this.goToNext();
		return;
	}
	if(document.getElementById("username").value === "") {
		document.getElementById("loginBtn").style.opacity = "1";
		return;
	};
	villo.user.login({
		username : document.getElementById("username").value,
		password : document.getElementById("password").value
	}, this.loginCallback.bind(this));
};
LoginAssistant.prototype.loginCallback = function(sof) {
	if(sof) {
		this.goToNext();
		return;
	} else {
		console.log("Error Logging In! Please try again.");
		//Mojo.Controller.errorDialog("Error Logging In! Please try again.", window);
	}
	console.log(sof);
	//Mojo.log(sof);
};
LoginAssistant.prototype.registerTry = function(event) {
	if(document.getElementById("regPassword1").value !== document.getElementById("regPassword2").value) {
		//Mojo.Controller.errorDialog("Passwords did not match. Try typing it again.", window);
	} else {
		villo.user.register({
			username : document.getElementById("regUsername").value,
			password : document.getElementById("regPassword1").value,
			password_confirm : document.getElementById("regPassword2").value,
			email : document.getElementById("regEmail").value
		}, this.registerCallback.bind(this));
	}
};
LoginAssistant.prototype.registerCallback = function(sof) {
	console.log("registerCallback was called.");
	if(sof === 0) {
		//Mojo.Controller.errorDialog("Registered! You may now log in.", window);
		this.switchLayoutBack();
	} else {
		//Mojo.Controller.errorDialog("Error registering! Please try again.", window);
	}
	Mojo.Log.info(sof);
};
LoginAssistant.prototype.switchLayoutBack = function(event) {
	this.didSwitch = false;
	document.getElementById("username").style.visibility = "visible";
	document.getElementById("password").style.visibility = "visible";
	document.getElementById("rememberBox").style.visibility = "visible";
	document.getElementById("regUsername").style.visibility = "hidden";
	document.getElementById("regPassword1").style.visibility = "hidden";
	document.getElementById("regPassword2").style.visibility = "hidden";
	document.getElementById("regEmail").style.visibility = "hidden";
	document.getElementById("loginBtn").style.visibility = "visible";
	document.getElementById("registerBtn").style.visibility = "visible";
	document.getElementById("doRegister").style.visibility = "hidden";
	if(!verticalMargin) {
		//document.getElementById("VILLO-LOGO").style.backgroundImage = "url(images/villo/logo-vertical.png)";
	}
};
LoginAssistant.prototype.handleCommand = function(event) {
	if(event.type === Mojo.Event.back) {
		//window.PalmSystem.setWindowOrientation("right");
		//window.PalmSystem.enableFullScreenMode(true);
		//menuStatus = "main";
		//this.controller.stageController.swapScene("menu");
		if(this.didSwitch) {
			this.switchLayoutBack();
		}
		event.stop();
	};
};
LoginAssistant.prototype.back = function(event) {
	if(this.didSwitch) {
		this.switchLayoutBack();
	} else {
		swapScene("menu");
	}
};
LoginAssistant.prototype.goToNext = function() {
	didLogIn = true;
	console.log("Success! User logged in.");
	menuStatus = "villo";
	window.setTimeout(function() {
		swapScene("menu", true);
	}, 150);
};
