var connection = require('../connection');
var socketio = require('../socket/socket-io');
var fs = require('fs');

function Image() {

  this.get = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM image INNER JOIN data_ukur ON image.id_data=data_ukur.id_data INNER JOIN algoritma ON image.id_algor=algoritma.id_algor', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.post = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.nama, req.data, req.algoritma, req.kerapatan];
      var query = 'insert into image (nama, id_data, id_algor, kerapatan) values (?, ?, ?, ?)';

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
    var data = [parseFloat(req.kerapatan), parseInt(req.id_image)];
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

  this.delete = function(req, res) {
    var data = [req.filename];
    var alamat = "rpieit-web/img/results/"+req.filename;
    fs.unlink(alamat, (err) => {
      if (err) throw err;
      console.log('successfully deleted '+req.filename);
    });
    connection.acquire(function(err, con) {
      con.query('delete from image where nama = ?', [data], function(err, result) {
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
