const { Router } = require("express");
const { loginHandler, registerHandler } = require("../handlers/authHandlers");

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);

module.exports = authRoutes;
