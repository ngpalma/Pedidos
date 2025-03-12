const { Router } = require("express");
const {
  loginController,
  registerController,
  forgotPasswordController,
  changePasswordController,
  resetPasswordController,
} = require("../controllers/authControllers");
const { authToken } = require("../middlewares/authMiddleware");

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/reset-password", resetPasswordController);
authRoutes.put("/change-password", authToken, changePasswordController);

module.exports = authRoutes;
