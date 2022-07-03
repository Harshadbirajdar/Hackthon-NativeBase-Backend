const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: process.env.NODE_ENV === "production" ? true : false,
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

// import all routes here
const user = require("./route/user");
const card = require("./route/card");

// router middleware
app.use("/api/v1", user);
app.use("/api/v1", card);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
