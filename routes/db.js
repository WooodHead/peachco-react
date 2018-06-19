var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function (app) {

    app.get("/search/:searchTerm", function (req, res) {
        console.log("search is hit");
        let query;
        let searchTerm = req.params.searchTerm;
        let isnum = /^\d+$/.test(searchTerm);
        if (isnum || searchTerm.startsWith("CA")) {
            if (searchTerm.startsWith("CA")) {
                searchTerm = searchTerm.substr(2);
            }
            if (searchTerm.endsWith("N")) {
                searchTerm = searchTerm.slice(0, -1);
            }
            if (searchTerm.length === 8) {
                query = {
                    where: {
                        secPic: {
                            $like: "%" + searchTerm + "%"
                        }
                    }
                };
            } else if (searchTerm.length > 8) {
                query = {
                    where: {
                        sku: searchTerm
                    }
                };
            }
        } else {
            searchTerm = "+" + searchTerm.split(" ").join(" +");
            query = {
                where: Sequelize.literal(
                    `MATCH (brand, collection, type, color) AGAINST('${searchTerm}' IN BOOLEAN MODE)`
                )
            };
        }
        db.bedding.findAll(query).then(function (data) {
            let hbsObject = {
                bedding: data
            };
            //console.log(hbsObject);
            // res.render("index", hbsObject);
            res.json(data);
        });
    });

    app.get("/item/:id", function (req, res) {
        db.bedding.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            console.log(data);
            let hbsObject = {
                item: data
            }
            // res.render("item", hbsObject);
            res.json(data);

        })
    })

};