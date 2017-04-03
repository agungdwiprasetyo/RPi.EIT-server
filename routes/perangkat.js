var perangkat = require('../models/perangkat');

module.exports = {
	configure: function(app){
		app.get('/perangkat', function(req, res) {
	      perangkat.get(req, res);
	    })

	    app.post('/perangkat', function(req, res) {
	      perangkat.post(req, res);
	    });

	    app.put('/perangkat', function(req, res) {
	      perangkat.put(req.body, res);
	    });

	    app.delete('/perangkat/:id/', function(req, res) {
	      perangkat.delete(req.params.id, res);
	    });
	}
};