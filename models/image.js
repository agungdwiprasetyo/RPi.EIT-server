var connection = require('../connection');
var socketio = require('../socket/socket-io');

function Image() {

  this.get = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('select * from image', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.post = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.nama, req.data, req.algoritma, req.kerapatan, req.arus_injeksi];
      var query = 'insert into image (nama, data, algoritma, kerapatan, arus_injeksi) values (?, ?, ?, ?, ?)';

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
    var data = [parseInt(req.id_image), parseInt(req.kerapatan)];
    connection.acquire(function(err, con) {
      var query = 'UPDATE image SET kerapatan = ? WHERE id_image = ?';
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
      con.query('delete from image where id_image = ?', [id], function(err, result) {
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
