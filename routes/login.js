var login = require('../models/login');

module.exports = {
	configure: function(app){
	    app.post('/login', function(req, res) {
	      login.post(req.body, res);
	    });
	}
};