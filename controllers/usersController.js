const db = require("../models");

module.exports = {

    register: function(req, res){
        db.users.create({
            username: "oscar",
            password: "toto"
        })
        .then(res => {
            console.log(res);
        })
    },

    login: function(req, res){
         console.log(req.user);
         res.send("test");
    }


};