const { Router } = require("express");
const {
  getSegmentsHandler,
  getSegmentByIdHandler,
  postSegmentHandler,
  patchSegmentHandler,
  deleteSegmentHandler,
} = require("../handlers/segmentsHandlers");

const segmentsRoutes = Router();

segmentsRoutes.get("/", getSegmentsHandler);
segmentsRoutes.get("/:id", getSegmentByIdHandler);
segmentsRoutes.post("/", postSegmentHandler);
segmentsRoutes.patch("/:id", patchSegmentHandler);
segmentsRoutes.delete("/:id", deleteSegmentHandler);

module.exports = segmentsRoutes;
