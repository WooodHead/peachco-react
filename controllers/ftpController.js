require("dotenv").config();

const keys = require("../keys");
const username = keys.ftp.username;
const password = keys.ftp.password;

const jsftp = require("jsftp");

const Ftp = new jsftp({
  host: "www.thepeachco.com",
  port: 21, // defaults to 21
  user: username,
  pass: password
});

module.exports = {

    listDir: function(req, res) {
        console.log(req.body);

        Ftp.ls(`/public_html/ebay/images/${req.body.directory}`, (err, contents) => {
            if (contents.length === 0){
                Ftp.raw("mkd", `/public_html/ebay/images/${req.body.directory}` ,(err, data) => {
                    if (err) {
                      return console.error(err);
                    }
                    Ftp.put(req.files[0].buffer, `/public_html/ebay/images/${req.body.directory}/${req.body.number}.jpg`, err => {
                        if (err) console.log(err);
                        if (!err) {
                          console.log("File transferred successfully!");
                          res.send("success");
                        }
                      });
                  });
            } else {
                Ftp.put(req.files[0].buffer, `/public_html/ebay/images/${req.body.directory}/${req.body.number}.jpg`, err => {
                    if (err) console.log(err);
                    if (!err) {
                      console.log("File transferred successfully!");
                      res.send("success");
                    }
                  });

            }
          });
    
    }
    

};