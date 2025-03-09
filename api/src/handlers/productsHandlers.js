const { Brand, Size, Segment, Product } = require("../db");
const { Op } = require("sequelize");
const {
  postProductController,
  getProductsController,
  patchProductController,
  deleteProductController,
  getProductByIdController,
  postProductsController,
} = require("../controllers/productsControllers");
const {
  buildWhereClause,
  buildIncludeClause,
  buildOrderClause,
} = require("../helpers/filterAndSort");

const postProductHandler = async (req, res) => {
  try {
    const { name, detail, price, brandId, segmentId, sizeId } = req.body;

    const brand = await Brand.findByPk(brandId);
    const size = await Size.findByPk(sizeId);
    const segment = await Segment.findByPk(segmentId);
    if (!brand) throw new Error("No se encuentra la marca");
    if (!size) throw new Error("No se encuentra el tamaño");
    if (!segment) throw new Error("No se encuentra el segmento");

    if (![name, detail, price, brandId, segmentId, sizeId].every(Boolean))
      throw new Error("Faltan cargar algunos datos");

    const brandPrefix = brand.name.slice(0, 2).toUpperCase();

    const maxArticle = await Product.max("article", {
      where: {
        article: {
          [Op.like]: `${brandPrefix}%`,
        },
      },
    });

    let nextNumber = 1001;
    if (maxArticle) {
      const currentMaxNumber = parseInt(maxArticle.slice(1), 10);
      nextNumber = currentMaxNumber + 1;
    }

    const article = `${brandPrefix}${nextNumber}`;

    const newProduct = await postProductController(
      name,
      detail,
      price,
      brandId,
      segmentId,
      sizeId,
      article
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const postProductsHandler = async (req, res) => {
  try {
    const data = req.body;
    const newProducts = await postProductsController(data);
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductsHandler = async (req, res) => {
  try {
    const where = buildWhereClause(req.query);
    const include = buildIncludeClause(req.query);
    const order = buildOrderClause(req.query);
    const allProducts = await getProductsController(where, include, order);
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getProductByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdController(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductController(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await patchProductController(id, data);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postProductHandler,
  getProductsHandler,
  deleteProductHandler,
  patchProductHandler,
  getProductByIdHandler,
  postProductsHandler,
};
