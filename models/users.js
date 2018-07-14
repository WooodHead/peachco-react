const bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {

    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    users.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    users.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return users;
}