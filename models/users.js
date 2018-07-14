const passportLocalSequelize = require("passport-local-sequelize");
const bcrypt = require("bcrypt-nodejs");


module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define("users", {
        // The user name cannot be null, and must be a proper user name before creation
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // The password cannot be null
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    passportLocalSequelize.attachToUser(users, {
        usernameField: 'userName',
        hashField: 'hash',
        saltField: 'salt'
    });

    users.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    users.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return users;
}