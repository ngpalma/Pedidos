const { Segment } = require("../db");

const postSegmentController = async (name) => {
  const [newSegment, created] = await Segment.findOrCreate({
    where: {
      name,
    },
  });
  if (!created) return "El Segment ya existe en la base de datos";
  return newSegment;
};

const getSegmentsController = async () => {
  const allSegments = await Segment.findAll();
  if (!allSegments) return "No hay Segments cargados en la base de datos";
  return allSegments;
};

const getSegmentByIdController = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) return "No se encuentra el Segment solicitado";
  return segment;
};

const deleteSegmentController = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) return "El Segment no existe o ya fue eliminado";
  const deletedSegment = await segment.destroy();
  return deletedSegment;
};

const patchSegmentController = async (id, data) => {
  const segment = await Segment.findByPk(id);
  if (!segment)
    return "No se puede modificar el Segment porque no existe en la base de datos";
  const updatedSegment = await Segment.update(data);
  return updatedSegment;
};

module.exports = {
  postSegmentController,
  getSegmentsController,
  deleteSegmentController,
  patchSegmentController,
  getSegmentByIdController,
};
