const passportLocalSequelize = require("passport-local-sequelize");


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
            allowNull: false
        }

    });

    passportLocalSequelize.attachToUser(users, {
        usernameField: 'userName',
        hashField: 'hash',
        saltField: 'salt'
    });

    return users;
}