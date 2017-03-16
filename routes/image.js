var image = require('../models/image');

module.exports = {
	configure: function(app){
		app.get('/image', function(req, res) {
	      image.get(req, res);
	    })

	    app.post('/image', function(req, res) {
	      image.post(req.body, res);
	    });

	    app.put('/image', function(req, res) {
	      image.put(req.body, res);
	    });

	    app.delete('/image', function(req, res) {
	      image.delete(req.body, res);
	    });
	}
};