const {
  postBrandController,
  getBrandsController,
  patchBrandsController,
  deleteBrandsController,
  getBrandsByIdController,
} = require("../controllers/BrandsControllers");

const postBrandsHandler = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) throw new Error("Faltan cargar algunos datos");

    const newBrand = await postBrandController(name);
    res.status(200).json(newBrand);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getBrandsHandler = async (req, res) => {
  try {
    const allBrands = await getBrandsController();
    res.status(200).json(allBrands);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getBrandsByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandsByIdController(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteBrandsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await deleteBrandsController(id);
    res.status(200).json(deletedBrand);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchBrandsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const brand = await patchBrandsController(id, data);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postBrandsHandler,
  getBrandsHandler,
  deleteBrandsHandler,
  patchBrandsHandler,
  getBrandsByIdHandler,
};
