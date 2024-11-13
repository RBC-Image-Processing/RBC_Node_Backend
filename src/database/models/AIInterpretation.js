"use strict";
module.exports = (sequelize, DataTypes) => {
  const AIInterpretation = sequelize.define(
    "AIInterpretation",
    {
      aiInterpretationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studyId: { type: DataTypes.STRING, allowNull: false },
      diagnosis: { type: DataTypes.TEXT },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      confidenceScore: { type: DataTypes.FLOAT },
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
