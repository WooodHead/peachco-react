const db = require("../models");

module.exports = {

    // register: function(req, res){
    //     db.users.create({
    //         username: "oscar",
    //         password: "toto"
    //     })
    //     .then(res => {
    //         console.log(res);
    //     })
    // },

    login: function(req, res){
         res.json(true);
    }


};