module.exports = function (sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        number: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Job;
}