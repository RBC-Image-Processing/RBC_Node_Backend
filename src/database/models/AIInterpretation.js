"use strict";
module.exports = (sequelize, DataTypes) => {
  const AIInterpretation = sequelize.define(
    "AIInterpretation",
    {
      ai_interpretation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      study_id: { type: DataTypes.STRING, allowNull: false },
      diagnosis: { type: DataTypes.TEXT },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      confidence_score: { type: DataTypes.FLOAT },
    },
    {
      timestamps: false,
      tableName: "AIInterpretations",
    }
  );

  //   AIInterpretation.associate = (models) => {
  //     AIInterpretation.belongsTo(models.Study, {
  //       foreignKey: "study_id",
  //       as: "study",
  //     });
  //   };

  return AIInterpretation;
};
