function DashboardAssistant() {
}

DashboardAssistant.prototype.updateDashboard = function(params, count) {
	this.room = params.room;
	var info = {
		user : params.user,
		message : params.content,
		room : params.room,
		count : count
	};
	var renderedInfo = Mojo.View.render({
		object : info,
		template : 'dashboard/dashboard-message'
	});
	var infoElement = this.controller.get('dashboardinfo');
	infoElement.update(renderedInfo);
	Mojo.Controller.getAppController().showBanner(params.user + ": " + params.content, {
		source : params.room
	});
	switch(params.room){
		case "ocean":
			var roomImgUrl = "images/villo/OCEAN.png";
			break;
		case "sky":
			var roomImgUrl = "images/villo/SKY.png";
			break;
	}
	this.controller.get("roomDiv").innerHTML = '<img alt="" src="' + roomImgUrl + '" style="width:58px; height:48px; left:150px; top:0px; opacity: .3; position:absolute;">';
};
DashboardAssistant.prototype.activate = function() {
	this.controller.listen(this.controller.get("dashboardinfo"), Mojo.Event.tap, this.openStage.bind(this));
};
DashboardAssistant.prototype.deactivate = function() {
	this.controller.stopListening(this.controller.get("dashboardinfo"), Mojo.Event.tap, this.openStage.bind(this));
};
DashboardAssistant.prototype.openStage = function(event) {
	switch(this.room){
		case "ocean":
			launchOceanLounge();
			break;
		case "sky":
			launchSkyLounge();
			break;
	}
};