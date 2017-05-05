var connection = require('../connectDB');

function Login() {
  this.post = function(req, res) {
    connection.acquire(function(err, con) {
      var query = "SELECT * FROM login WHERE username = '"+req.username+"'";
      var pass = req.password;

      con.query(query, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 0, message: 'query failed'});
        } else {
            if(result.length>0 && pass){
                if(result[0].password == pass) res.send({status: 1, data: result});
                else res.send({status: 0, message: 'auth error'});
            }else{
                res.send({status: 0, message: 'auth error'});
            }
        }
      });
    });
  };
}

module.exports = new Login();
