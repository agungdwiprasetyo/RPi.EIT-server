// Modul socket.io

var socketio = require('socket.io');

module.exports.listen = function(server) {
	var io = socketio.listen(server);
	var numClient = 0;
	var num = 0;
	var clients = [{raspiId: '', status: false, token: ''}, {webId: '', status: false}, {androidId: '', status: false}];
	var realtimeEIT = {algor: '', arus: '', kerapatan: '', data: ''};

	io.on('connection', function(socket){
		socket.on('raspiConnect', function(data){
            clients[0].raspiId = socket.id;
            clients[0].status = data['status'];
            clients[0].token = data['token'];

			numClient++;
      		console.log("Connected raspi = " + clients[0].raspiId + " User = " + numClient);
      		console.log(clients);
			socket.broadcast.emit('raspiStatus', {
				online: true
			});
		});
		socket.on('webConnect', function(data){
            clients[1].webId = socket.id;
            clients[1].status = data['status'];

			numClient++;
      		console.log("Connected web = " + clients[1].webId + " User = " + numClient);
      		console.log(clients);
			socket.emit('raspiStatus', {
				online: clients[0].status
			});
		});
		socket.on('androidConnect', function(data){
            clients[2].androidId = socket.id;
            clients[2].status = true;

			numClient++;
      		console.log("Connected web = " + clients[2].androidId + " User = " + numClient);
      		console.log(clients);
			socket.emit('raspiStatus', {
				online: true
			});
		});

		socket.on('runReconstruction', function(data){
			// console.log(data);
			if(data['status']){
				socket.broadcast.emit('startReconstruction', data);
			}
		});
		socket.on('finishReconstruction', function(data){
			console.log("data image baru: "+data['filename']);
			socket.broadcast.emit('notifFinish', data);
		});

		socket.on('startGetData', function(data){
			socket.broadcast.emit('getDataVoltage', {
				status: clients[0].status,
				token: clients[0].token
			});
		});
		socket.on('postDataVoltage', function(data){
			if (data["status"]) {
				console.log("viewvolttage\n");
				socket.broadcast.emit('viewResultVoltage', data);
			}
			num++;
			data['status'] = false;
			console.log(num,data['status']);
		});

		socket.on('cobago', function(data){
			console.log(data);
			socket.broadcast.emit('toGo', data);
		});

		socket.on('disconnect', function(){
			if(numClient){
				numClient--;
			}

			if(socket.id == clients[0].raspiId){
				// raspi disconnect
				console.log("yg diskonek itu raspi");
				clients[0].raspiId = '';
            	clients[0].status = false;
            	socket.broadcast.emit('raspiStatus', {
					online: clients[0].status
				});
			}else if(socket.id == clients[1].webId){
				console.log("yg diskonek itu web");
				clients[1].webId = '';
            	clients[1].status = false;
			}
			console.log(clients);
		});
	});
}