module.exports = function (sequelize, DataTypes) {
    const packageSizes = sequelize.define("packageSizes", {
        shippingType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shippingWeight: {
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
    });

    packageSizes.associate = models => {
        packageSizes.hasMany(models.bedding);
    };

    return packageSizes;
}