const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "image",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La ruta del archivo no puede estar vacía",
          },
        },
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
