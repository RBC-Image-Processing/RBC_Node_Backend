"use strict";
module.exports = (sequelize, DataTypes) => {
  const DoctorComment = sequelize.define(
    "DoctorComment",
    {
      doctor_comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ai_interpretation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "AIInterpretation",
          key: "ai_interpretation_id",
        },
      },
      user_id: {
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
      foreignKey: "ai_interpretation_id",
      as: "ai_interpretation",
    });
    DoctorComment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "doctor",
    });
  };

  return DoctorComment;
};
