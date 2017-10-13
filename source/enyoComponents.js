enyo.kind({
	name : "enyoComponents",
	kind : "VFlexBox",
	width: 0,
	height: 0,
	components : [
		{kind: enyo.Hybrid, name: "plugin", width: 0, height: 0, params:["0","1"], executable: "soundplug_plugin", takeKeyboardFocus: false, 
		    onPluginReady: "handlePluginReady"},
		{kind : enyo.ApplicationEvents, onBack : "goBack"}
	],
	pluginReady: false,
	loaded: false,
	
	create : function(inSender, inEvent) {
		this.inherited(arguments);
		enyo.setAllowedOrientation('right');
	},
	handlePluginReady: function(inSender) {
		console.error("plugin initalized");
		this.pluginReady = true;
	},
	playSound: function(name, index) {
		//console.error("playing sound: " + name);
		if(this.pluginReady){
			var status = this.$.plugin.callPluginMethod("play", "audio/" + name + ".wav");
		} else {
			if(!this.loaded){
				console.error("plugin not initialized, loading HTML5 audio");
				this.loadSounds();
			}
			this.play(index);
		}
	},
	goBack : function(inSender, inEvent) {
		inEvent.stopPropagation();
		inEvent.preventDefault();
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
		return -1;
	},
	playNext: function () {
		playQueue.splice(0, 1);
		if(playQueue.length) {
			playSound(playQueue[0], true);
		}
	},
	loadSounds: function () {
		this.loaded = true;
		console.error("LOADING SOUNDS...");
		for(var x in sounds) {
			var s = new Audio();
			s.src = "audio/" + sounds[x] + ".wav";
			s.preload = "auto";
			//console.error(s.src);
			s.addEventListener("ended", function(e) {
				this.pause();
				playQueue.splice(0, 1);
				if(playQueue.length) {
					enyoComponentz.play(playQueue[0], true);
				}
			}, false);
			soundArray.push(s);
		}
	},
	play: function (audioIndex, force) {
		force == null ? force = false : force;
		if(!force)
			playQueue.push(audioIndex);
		if(playQueue.length == 1 || force) {
			try{
				soundArray[playQueue[0]].play();
			} catch (e){console.error("omfg error playing");}
		}
	}
});