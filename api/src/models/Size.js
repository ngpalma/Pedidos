const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "size",
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
                "1 Lt.",
                "5 Lts.",
                "350 Cc.",
                "300 Cc.",
                "40 Cc.",
                "330 Grs.",
                "250 Grs.",
                "1 Kg.",
                "700 Grs.",
                "12 Unid.",
                "40 Unid.",
                "70 Grs.",
              ],
            ],
            msg: "Tamaños disponibles: 1 Lt., 5 Lts, 350 Cc., 300 Cc., 40 Cc., 330 Grs., 250 Grs., 1 Kg., 700 Grs., 12 Unid., 40 Unid., 70 Grs.",
          },
        },
      },
    },
    { timestamps: false }
  );
};
