
function retreiveOldDatabase() {
	var cupcake = new CUPCAKE();
	if(!cupcake.init()) {
		console.log("Uh oh, cupcake initialization failed!");
	}
	cupcake.retrieveCupcake('wildnGameStats', gotCupcake.bind(this));
}

function gotCupcake(response) {
	//console.log("Response %j", response);
	var c = 0;
	var x;
	if(response) {
		for(value in response) {
			wildnGameStats[value] = response[value];
			wgStats[c] = wildnGameStats[value];
			c++;
		}
	}
	var y = 14;
	do {
		x = y - 1;
		wgStats[x + 14] = wgStats[x + 14] + wgStats[x];
	} while (--y);
	y = 24;
	do {
		x = y + 28 - 1;
		wgStats[x + 24] = wgStats[x + 24] + wgStats[x];
	} while (--y);
	//console.log("myObj %j", wildnGameStats);
	localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
};

function CUPCAKE() {
	this.db = null;
	var databaseName = "ext:" + "Wild'n Video Poker" + "CupcakeDB", // required
	version = "0.2", // required
	displayName = "Wild'n Video Poker" + " cupcake database";
	this.init = function() {
		this.db = openDatabase(databaseName, version, displayName);
		if(!this.db) {
			return false;
		}
		var sqlCreateCupcakeTable = "CREATE TABLE IF NOT EXISTS 'cupcakes' " + "(label TEXT PRIMARY KEY, cupcakeobject TEXT); GO;";
		this.db.transaction((function(inTransaction) {
			inTransaction.executeSql(sqlCreateCupcakeTable, [], function() {
			}, this.errorHandler);
		}).bind(this));
		return true;
	};
	this.updateCupcake = function(label, cupcake) {
		var sqlUpdateCupcake = "REPLACE INTO 'cupcakes' (label, cupcakeobject) " + "VALUES (?, ?); GO;";
		cupcake = Object.toJSON(cupcake);
		this.db.transaction((function(inTransaction) {
			inTransaction.executeSql(sqlUpdateCupcake, [label, cupcake], function(inTransaction, inResultSet) {
			}, this.errorHandler);
		}).bind(this));
	};
	this.retrieveCupcake = function(inLabel, inCallback) {
		var sqlRetrieveCupcake = "SELECT label, cupcakeobject from cupcakes WHERE label=?; GO;";
		this.db.transaction((function(inTransaction) {
			inTransaction.executeSql(sqlRetrieveCupcake, [inLabel], function(inTransaction, inResultSet) {
				var results = [];
				if(inResultSet.rows && inResultSet.rows.length != 0) {
					wildnGameStats = JSON.parse(eval(inResultSet.rows.item(0)).cupcakeobject);
					localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
					LoadAssistant.prototype.setStats();
				}
			}, this.errorHandler);
		}).bind(this));
	};
	this.deleteCupcake = function(inLabel) {
		var sqlDeleteCupcake = "DELETE FROM cupcakes WHERE (label=?); GO;";
		this.db.transaction((function(inTransaction) {
			inTransaction.executeSql(sqlDeleteCupcake, [inLabel], function(inTransaction, inResultSet) {
			}, this.errorHandler);
		}).bind(this));
	};
	this.errorHandler = function(inTransaction, inError) {};
}