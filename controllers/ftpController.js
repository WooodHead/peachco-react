require("dotenv").config();

const keys = require("../keys");
const username = keys.ftp.username;
const password = keys.ftp.password;

// const ftpClient = require("ftp-client");

// const config = {
//     host: "http://www.thepeachco.com",
//     port: 21,
//     user: username,
//     password: password
// }
// const client = new ftpClient(config, options);

module.exports = {

    listDir: function(req, res) {
        console.log("hit this route");
        console.log(req.originalname);
        

    }
    

};