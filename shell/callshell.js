var sys = require('sys');
var exec = require('child_process').exec;

module.exports.start = function() {
	exec('./RPi.EIT-algorithms/main.py', function(error, stdout, stderr) {
		if(error){
			console.log("Program error gan");
			// return
		}
		console.log('Program output:', stdout);
		console.log('Program stderr:', stderr);
	});
}
