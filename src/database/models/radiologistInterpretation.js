"use strict";
module.exports = (sequelize, DataTypes) => {
  const RadiologistInterpretation = sequelize.define(
    "RadiologistInterpretation",
    {
      interpretationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studyId: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        },
      },
      diagnosis: { type: DataTypes.TEXT },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "RadiologistInterpretations",
    }
  );

  RadiologistInterpretation.associate = (models) => {
    RadiologistInterpretation.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return RadiologistInterpretation;
};
