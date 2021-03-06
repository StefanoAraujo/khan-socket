var KhanSocket = (function(){

	let scope = new Object(),
		endpoint = "aHR0cDovL3NlcmVuZS1jb3ZlLTgwMDU2Lmhlcm9rdWFwcC5jb20v",
		origin = btoa(location.origin);

	scope.defineSocket = function(s){
		scope.socket = s(atob(endpoint));
	}

	scope.emit = function(obs){
		obs = obs || {};
		obs = Object.keys(obs).map(function(key){
			var k = key+"--"+origin;
			var rt = new Object();
			rt[k] = obs[key];
			return rt;
		});
		var nvObs = {};
		obs.map(function(v){
			nvObs = Object.assign(nvObs, v);
		});
		scope.socket.emit('emit', nvObs);
	}

	scope.on = function(canal, callback){
		var k = canal+"--"+origin;
		scope.socket.on(k, callback);
	}

	return function(so){
		if(!window['khanInstance']){
			var s = so || false;
			if(s){ 
				scope.defineSocket(s);
				window.khanInstance = scope;
				return scope;
			}else{
				throw "Erro ao Passar Websocket!!";
			}
		}else{
			console.log("Return Khan Instance!!");
			return window["khanInstance"];
		}
	};

}).apply(KhanSocket);
