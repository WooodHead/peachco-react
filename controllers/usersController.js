const db = require("../models");

module.exports = {

    register: function(req, res){
        db.users.create({
            userName: "newUser",
            hash: "newHash"
        })
        .then(res => {
            console.log(res);
        })
    }


};