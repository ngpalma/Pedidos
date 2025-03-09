const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "segment",
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
            args: [
              [
                "Shampoo",
                "Acondicionador",
                "Baño de crema",
                "Alisado",
                "Tratamiento",
                "Tintura",
                "Polvo decolorante",
                "Agua oxigenada",
                "Aceite de puntas",
                "Gorros",
                "Bandas térmicas",
                "Gel",
                "Crema para peinar",
              ],
            ],
            msg: "El tipo debe ser uno de los siguientes: Shampoo, Acondicionador, Baño de crema, Alisado, Tratamiento, Tintura, Decolorante, Agua oxigenada, Aceite de puntas, Gorro, Bandas térmicas, Gel, Crema para peinar",
          },
        },
      },
    },
    { timestamps: false }
  );
};
