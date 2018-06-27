module.exports = function (sequelize, DataTypes) {
    const packageSizes = sequelize.define("packageSizes", {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shippingCost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        handlingCharge: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    return packageSizes;
}