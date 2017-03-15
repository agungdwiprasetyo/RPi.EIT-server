// Modul socket.io
// API: raspiConnect, webConnect, runReconstruction, status, raspiStatus, webStatus
var socketio = require('socket.io');

module.exports.listen = function(server) {
	var io = socketio.listen(server);
	var numClient = 0;
	var clients = [{raspiId: '', status: false}, {webId: '', status: false}, {androidId: '', status: false}];

	io.on('connection', function(socket){
		socket.on('raspiConnect', function(data){
            clients[0].raspiId = socket.id;
            clients[0].status = data['status'];

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
			console.log(data);
			if(data['status']){
				socket.broadcast.emit('startReconstruction', data);
			}
		});

		socket.on('status', function(data){
			console.log(data['status']);
			socket.broadcast.emit('statusBar', data);
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