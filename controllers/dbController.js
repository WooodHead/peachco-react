const db = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  findByQuery: function(req, res) {
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
    db.bedding.findAll(query).then(function(data) {
      res.json(data);
    });
  },

  getAttributes: function(req, res) {
    if (req.params.type === "new") {
      db.bedding
        .findOne({
          where: {
            id: 60
          }
        })
        .then(data => {
          let newData = {};
          Object.keys(data.dataValues).forEach(key => {
            let k = key;
            newData[k] = "";
          });
          res.json(newData);
        });
    } else if (req.params.type === "similar") {
      db.bedding
        .findOne({
          where: {
            id: req.params.id
          }
        })
        .then(function(data) {
          let newData = {};
          Object.keys(data.dataValues).forEach(key => {
            let k = key;
            let v = data.dataValues[key];
            if (
              [
                "brand",
                "collection",
                "f_1",
                "f_2",
                "f_3",
                "f_4",
                "f_5",
                "f_6",
                "f_7",
                "f_8",
                "f_9",
                "pic"
              ].includes(k)
            ) {
              newData[k] = v;
            } else {
              newData[k] = "";
            }
          });
          res.json(newData);
        });
    } else if (req.params.type === "exact") {
      db.bedding
        .findOne({
          where: {
            id: req.params.id
          }
        })
        .then(function(data) {
          res.json(data);
        });
    }
  },

  addToDatabase: function(req, res) {
    console.log(req.body);
    db.bedding.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err))
  },

  updateItem: function(req, res) {
    db.bedding.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        db.bedding.findOne({
          where: {
            id: req.params.id
          }
        }).then(data => {
          res.json(data);
        })
      });
  },

  getShippingTemplates: function(req, res) {
    db.packageSizes.findAll().then(function(data) {
      res.json(data);
    });
  }
};
