module.exports = function (sequelize, DataTypes) {
    var bedding = sequelize.define("bedding", {
        sku: {
            type: DataTypes.BIGINT,
            allowNull: true,
            fulltext: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
            fulltext: true
        },
        collection: {
            type: DataTypes.STRING,
            allowNull: true,
            fulltext: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            fulltext: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
            fulltext: true
        },
        f_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_5: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_6: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_7: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_8: {
            type: DataTypes.STRING,
            allowNull: true
        },
        f_9: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_5: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_6: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_7: {
            type: DataTypes.STRING,
            allowNull: true
        },
        s_8: {
            type: DataTypes.STRING,
            allowNull: true
        },
        m_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        m_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        retail: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: true
        },
        itemTitle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secPic: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        freezeTableName: true
    }, {
        indexes: [
            {
                fulltext: true,
                fields: ['brand', 'collection', 'type', 'color']
            }
        ]
    });

    return bedding;
}