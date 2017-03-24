var multer  = require('multer');
var mkdirp = require('mkdirp');
var connection = require('../connectDB');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dest = './rpieit-web/data';
    mkdirp(dest, function (err) {
        if (err) cb(err, dest);
        else cb(null, dest);
    });
  },
  filename: function (req, file, cb) {
    console.log("req file",req.body);
    cb(null, req.body.filename);
  }
});

var upload = multer({ storage: storage });

module.exports.configure = function(app){
  app.post('/upload', upload.any(), function(req , res){
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
  });
}