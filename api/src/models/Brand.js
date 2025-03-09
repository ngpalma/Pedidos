const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "brand",
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
          isIn: {
            args: [["Grass Line", "BF", "Fidelité", "Issue", "Kerat"]],
            msg: "Marcas validas: Grass Line, BF, Fidelité, Issue, Kerat",
          },
        },
      },
    },
    { timestamps: false }
  );
};
