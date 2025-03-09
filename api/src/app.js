const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");
const notFoundHandler = require("./middlewares/notFoundHandler.js");
const cors = require("cors");

require("./db.js");

const server = express();

server.name = "API";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Content-Security-Policy",
  ],
};

server.use(cookieParser());
server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan("dev"));

server.use("/uploads", express.static("uploads"));

server.use("/", routes);

server.use(notFoundHandler);

server.use(errorHandler);

module.exports = server;
