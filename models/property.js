'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER
       },
    propertyName: DataTypes.STRING,
    propertyType: DataTypes.STRING,
    amenities: DataTypes.STRING
  }, {});
  Property.associate = function (models) {
    Property.belongsTo(models.User, { foreignKey: 'userId' });
    // associations can be defined here
  };
  return Property;
};