const { Router } = require("express");
const {
  getSegmentsHandler,
  getSegmentByIdHandler,
  postSegmentHandler,
  patchSegmentHandler,
  deleteSegmentHandler,
} = require("../handlers/segmentsHandlers");
const { authToken, authorizeAdmin } = require("../middlewares/authMiddleware");

const segmentsRoutes = Router();

segmentsRoutes.get("/", getSegmentsHandler);
segmentsRoutes.get("/:id", getSegmentByIdHandler);
segmentsRoutes.post("/", authToken, authorizeAdmin, postSegmentHandler);
segmentsRoutes.patch("/:id", authToken, authorizeAdmin, patchSegmentHandler);
segmentsRoutes.delete("/:id", authToken, authorizeAdmin, deleteSegmentHandler);

module.exports = segmentsRoutes;
