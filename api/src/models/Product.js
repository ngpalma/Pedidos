const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del producto no puede estar vacío",
          },
          len: {
            args: [3, 25],
            msg: "El nombre del producto debe tener entre 3 y 25 caracteres",
          },
        },
      },
      article: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
            args: [0, 25],
            msg: "El artículo del producto debe tener como máximo 25 caracteres",
          },
        },
      },
      detail: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 255],
            msg: "La descripcion del producto debe tener como máximo 255 caracteres",
          },
        },
      },
      price: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: {
            msg: "El precio debe ser un número válido",
          },
          min: {
            args: [0],
            msg: "El precio debe ser mayor o igual a 0",
          },
        },
      },
    },
    { timestamps: false }
  );
};
