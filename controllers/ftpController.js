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

        Ftp.put(req.buffer, "/new_dir/1.jpg", err => {
            if (err) console.log(err);
            if (!err) {
              console.log("File transferred successfully!");
            }
          });
    
    }
    

};