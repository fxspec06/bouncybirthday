function loadSounds() {
	sounds = ["FLIP", "HOLD", "UNHOLD", "DEAL1", "DEAL2", "DEAL3", "DEAL4", "DEAL5", "PAYOUT-SMALL", "PAYOUT-MEDIUM", "PAYOUT-LARGE", "LVLUP", "LOSE"];
	soundArray = [];
	playQueue = [];
	if(typeof(enyoComponentz) == "undefined"){loadHTML5Audio()}
}
function playSound(audioIndex) {
	switch(deviceType) {
		case "iOS":
			var soundURL = "%@/www/audio/" + sounds[audioIndex] + ".wav";
			document.location = "wildnpoker:" + "playsound:" + soundURL;
			playQueue.splice(0, 1);
			break;
		case "Android":
			Android.playSound(audioIndex);
			break;
		default:
			enyoComponentz.playSound(sounds[audioIndex], audioIndex);
			return;
			break;
	}
}
function loadHTML5Audio() {
	enyoComponentz = {
		playSound: function(name, index) {
			//console.error("playing sound: " + name);
			if(this.pluginReady){
				var status = this.$.plugin.callPluginMethod("play", "audio/" + name + ".wav");
			} else {
				if(!this.loaded){
					console.error("plugin not initialized, loading HTML5 audio");
					this.loadSounds();
				}
				var overlap = deviceType == "web" ? false : false;
				this.play(index, overlap);
			}
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
	}
}