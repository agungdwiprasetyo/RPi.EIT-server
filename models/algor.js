var connection = require('../connectDB');
var socketio = require('../socket/socket-io');

function Image() {

  this.get = function(req, res) {
    connection.acquire(function(err, con) {
      var reqGetData = req.headers['idalgor'];
      if(reqGetData){
        var kueri = "SELECT * FROM algoritma WHERE id_algor = '"+reqGetData+"'";
      }else{
        var kueri = 'SELECT * FROM algoritma';
      }
      con.query(kueri, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.post = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.nama_algor];
      var query = 'insert into algoritma (nama_algor) values (?)';

      con.query(query, creds, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 0, message: 'Insert failed'});
        } else {
          res.send({status: 1, message: 'Insert successfully'});
        }
      });
    });
  };

  this.put = function(req, res) {
    var data = [req.nama_algor, parseInt(req.id_algor)];
    connection.acquire(function(err, con) {
      var query = 'UPDATE algoritma SET nama_algor = ? WHERE id_algor = ?';
      con.query(query, data, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 0, message: 'Update failed'});
        } else {
          res.send({status: 1, message: 'Update successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from algoritma where id_algor = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 0, message: 'Delete failed'});
        } else {
          res.send({status: 1, message: 'Deleted successfully'});
        }
      });
    });
  };

}

module.exports = new Image();
