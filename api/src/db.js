require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    native: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Unable to connect to DB:", err));

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Product, Address, Brand, Size, Segment, Image } =
  sequelize.models;

User.hasMany(Address);
Address.belongsTo(User);

Size.hasMany(Product);
Product.belongsTo(Size);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Segment.hasMany(Product);
Product.belongsTo(Segment);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.belongsToMany(User, { through: "cart", otherKey: "productId" });
User.belongsToMany(Product, { through: "cart", otherKey: "userId" });

Product.belongsToMany(User, { through: "wishlist" });
User.belongsToMany(Product, { through: "wishlist" });

Product.belongsToMany(User, { through: "order" });
User.belongsToMany(Product, { through: "order" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
