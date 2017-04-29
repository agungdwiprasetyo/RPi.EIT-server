var connection = require('../connectDB');
var socketio = require('../socket/socket-io');
var fs = require('fs');

function Image() {

  this.get = function(req, res) {
    connection.acquire(function(err, con) {
      var reqGetData = req.headers['iddata'];
      if(reqGetData){
        var kueri = "SELECT * FROM data_ukur WHERE filename = '"+reqGetData+"'";
      }else{
        var kueri = 'SELECT * FROM data_ukur ORDER BY id_data DESC';
      }
      con.query(kueri, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.post = function(req, res) {
    connection.acquire(function(err, con) {
      var creds = [req.body.nama_data, req.body.filename, req.body.arus_injeksi];
      var query = 'INSERT INTO data_ukur (nama_data, filename, arus_injeksi) VALUES (?, ?, ?)';

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
    if(req.citra){
      if(req.citra=="apus") req.citra = "";
      var data = [req.citra, parseInt(req.id_data)];
      var query = 'UPDATE data_ukur SET citra = ? WHERE id_data = ?';
    }else if(req.model){
      var data = [req.model, parseInt(req.id_data)];
      var query = 'UPDATE data_ukur SET model = ? WHERE id_data = ?';
    }else{
      var data = [req.alamat_data, parseInt(req.id_data)];
      var query = 'UPDATE data_ukur SET alamat_data = ? WHERE id_data = ?';
    }
    connection.acquire(function(err, con) {
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
    var data = [req.id];
    var alamat = "./RPi.EIT-web/dataObjek/"+req.filename;
    fs.unlink(alamat, (err) => {
      if (err) throw err;
      console.log('successfully deleted '+req.filename);
    });
    connection.acquire(function(err, con) {
      con.query('delete from data_ukur where id_data = ?', [data], function(err, result) {
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
