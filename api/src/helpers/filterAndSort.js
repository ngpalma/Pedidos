const { Op } = require("sequelize");
const { Brand, Segment, Size } = require("../db");

const buildWhereClause = (query) => {
  const { name, article, priceMin, priceMax } = query;

  const where = {};

  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }
  if (article) {
    where.article = { [Op.iLike]: `%${article}%` };
  }
  if (priceMin) {
    where.price = { [Op.gte]: priceMin };
  }
  if (priceMax) {
    where.price = where.price
      ? { ...where.price, [Op.lte]: priceMax }
      : { [Op.lte]: priceMax };
  }

  return where;
};

const buildIncludeClause = (query) => {
  const { brandName, segmentName, sizeName } = query;

  const include = [];

  if (brandName) {
    include.push({
      model: Brand,
      as: "brand",
      where: { name: { [Op.iLike]: `%${brandName}%` } },
    });
  }  
  if (segmentName) {
    include.push({
      model: Segment,
      as: "segment",
      where: { name: { [Op.iLike]: `%${segmentName}%` } },
    });
  }
  if (sizeName) {
    include.push({
      model: Size,
      as: "size",
      where: { name: { [Op.iLike]: `%${sizeName}%` } },
    });
  }

  return include;
};

const buildOrderClause = (query) => {
  const { orderBy, orderDirection } = query;
  const order = [];
  if (orderBy) {
    order.push([orderBy, orderDirection || "ASC"]);
  }
  return order;
};

module.exports = {
  buildWhereClause,
  buildIncludeClause,
  buildOrderClause,
};
