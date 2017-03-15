var algor = require('../models/algor');

module.exports = {
	configure: function(app){
		app.get('/algor', function(req, res) {
	      algor.get(req, res);
	    })

	    app.post('/algor', function(req, res) {
	      algor.post(req.body, res);
	    });

	    app.put('/algor', function(req, res) {
	      algor.put(req.body, res);
	    });

	    app.delete('/algor/:id/', function(req, res) {
	      algor.delete(req.params.id, res);
	    });
	}
};