"use strict";
module.exports = (sequelize, DataTypes) => {
  const DoctorComment = sequelize.define(
    "DoctorComment",
    {
      doctorCommentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      aiInterpretationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "AIInterpretation",
          key: "aiInterpretationId",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "userId",
        },
      },
      rating: { type: DataTypes.INTEGER },
      comment: { type: DataTypes.TEXT },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      timestamps: false,
      tableName: "DoctorComments",
    }
  );

  DoctorComment.associate = (models) => {
    DoctorComment.belongsTo(models.AIInterpretation, {
      foreignKey: "aiInterpretationId",
    });
    DoctorComment.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return DoctorComment;
};
