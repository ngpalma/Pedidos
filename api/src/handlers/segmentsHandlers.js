const {
    postSegmentController,
    getSegmentsController,
    patchSegmentController,
    deleteSegmentController,
    getSegmentByIdController,
  } = require("../controllers/segmentsControllers");
  
  const postSegmentHandler = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) throw new Error("Faltan cargar algunos datos");
  
      const newSegment = await postSegmentController(name);
      res.status(200).json(newSegment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  const getSegmentsHandler = async (req, res) => {
    try {
      const allSegments = await getSegmentsController();
      res.status(200).json(allSegments);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  const getSegmentByIdHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const segment = await getSegmentByIdController(id);
      res.status(200).json(segment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  const deleteSegmentHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSegment = await deleteSegmentController(id);
      res.status(200).json(deletedSegment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  const patchSegmentHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const segment = await patchSegmentController(id, data);
      res.status(200).json(segment);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  
  module.exports = {
    postSegmentHandler,
    getSegmentsHandler,
    deleteSegmentHandler,
    patchSegmentHandler,
    getSegmentByIdHandler,
  };
  