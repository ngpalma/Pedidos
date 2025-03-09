const {
  postSizeController,
  getSizesController,
  patchSizeController,
  deleteSizeController,
  getSizeByIdController,
} = require("../controllers/sizesControllers");

const postSizeHandler = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) throw new Error("Faltan cargar algunos datos");

    const newSize = await postSizeController(name);
    res.status(200).json(newSize);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getSizesHandler = async (req, res) => {
  try {
    const allSizes = await getSizesController();
    res.status(200).json(allSizes);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getSizeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await getSizeByIdController(id);
    res.status(200).json(size);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteSizeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSize = await deleteSizeController(id);
    res.status(200).json(deletedSize);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const patchSizeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const size = await patchSizeController(id, data);
    res.status(200).json(size);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  postSizeHandler,
  getSizesHandler,
  deleteSizeHandler,
  patchSizeHandler,
  getSizeByIdHandler,
};
