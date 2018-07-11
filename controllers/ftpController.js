const Client = require("ftp");
const c = new Client();


module.exports = {

    listDir: function(req, res) {
        console.log(c);
        c.on("ready", function() {
            console.log("i am ready");
        })
        // c.on('ready', function() {
        //     console.log("ready");
        //     c.list(function(err, list) {
        //       if (err) throw err;
        //       console.dir(list);
        //       c.end();
        //     })
        //   })
        //   c.connect();
        //   res.send("something");
    }
    

};