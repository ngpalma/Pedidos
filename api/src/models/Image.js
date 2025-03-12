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
          isUrl: true,
        },
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: { type: DataTypes.ENUM("image", "video"), defaultValue: "image" },
    },
    { timestamps: false }
  );
};
