"use strict";
module.exports = (sequelize, DataTypes) => {
  const RadiologistInterpretation = sequelize.define(
    "RadiologistInterpretation",
    {
      interpretation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      study_id: { type: DataTypes.STRING, allowNull: false },
      user_id: {
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
      foreignKey: "user_id",
    });
  };

  return RadiologistInterpretation;
};
