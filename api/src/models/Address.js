const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 100] },
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La provincia no puede estar vacía",
          },
          len: {
            args: [2, 50],
            msg: "La provincia debe tener entre 2 y 50 caracteres",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La ciudad no puede estar vacía",
          },
          len: {
            args: [2, 50],
            msg: "La ciudad debe tener entre 2 y 50 caracteres",
          },
        },
      },
    },
    { timestamps: false }
  );
};
