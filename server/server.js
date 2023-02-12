require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const moment = require("moment");

// db
const db = require("./db/conn");

// routes
const memberRoute = require("./routes/membersRoute.js");
const adminRoute = require("./routes/adminRoute.js");
const productsRoute = require("./routes/productsRoute.js");
// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.static("uploads"));
app.use(memberRoute);
app.use(productsRoute);
app.use(adminRoute);

// url

// listen
app.listen(process.env.SERVER_PORT, () => {
  const dir = "uploads";
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) throw err;
    });
  }
  console.log("Server Running Port " + process.env.SERVER_PORT);
});
