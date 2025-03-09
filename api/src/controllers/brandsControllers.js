const { Brand } = require("../db");

const postBrandController = async (name) => {
  const [newBrand, created] = await Brand.findOrCreate({
    where: {
      name,
    },
  });
  if (!created) return "La marca ya existe en la base de datos";
  return newBrand;
};

const getBrandsController = async () => {
  const allBrands = await Brand.findAll();
  if (!allBrands) return "No hay marcas cargados en la base de datos";
  return allBrands;
};

const getBrandByIdController = async (id) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return "No se encuentra la marca solicitada";
  return brand;
};

const deleteBrandController = async (id) => {
  const brand = await Brand.findByPk(id);
  if (!brand) return "La marca no existe o ya fue eliminada";
  const deletedBrand = await brand.destroy();
  return deletedBrand;
};

const patchBrandController = async (id, data) => {
  const brand = await Brand.findByPk(id);
  if (!brand)
    return "No se puede modificar la marca porque no existe en la base de datos";
  const updatedBrand = await brand.update(data);
  return updatedBrand;
};

module.exports = {
  postBrandController,
  getBrandsController,
  deleteBrandController,
  patchBrandController,
  getBrandByIdController,  
};
