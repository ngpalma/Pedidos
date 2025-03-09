const { Size } = require("../db");

const postSizeController = async (name) => {
  const [newSize, created] = await Size.findOrCreate({
    where: {
      name,
    },
  });
  if (!created) return "El Size ya existe en la base de datos";
  return newSize;
};

const getSizesController = async () => {
  const allSizes = await Size.findAll();
  if (!allSizes) return "No hay Sizes cargados en la base de datos";
  return allSizes;
};

const getSizeByIdController = async (id) => {
  const size = await Size.findByPk(id);
  if (!size) return "No se encuentra el Size solicitado";
  return size;
};

const deleteSizeController = async (id) => {
  const size = await Size.findByPk(id);
  if (!size) return "El Size no existe o ya fue eliminado";
  const deletedSize = await size.destroy();
  return deletedSize;
};

const patchSizeController = async (id, data) => {
  const size = await Size.findByPk(id);
  if (!size)
    return "No se puede modificar el Size porque no existe en la base de datos";
  const updatedSize = await size.update(data);
  return updatedSize;
};

module.exports = {
  postSizeController,
  getSizesController,
  deleteSizeController,
  patchSizeController,
  getSizeByIdController,
};
