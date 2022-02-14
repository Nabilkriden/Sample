const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || "8000";
const dbUrl = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL || dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Users CRUD
// Inv User
const newUserRoute = require("./Routes/newUser");
app.use("/api/invite", newUserRoute);
// User Login
const loginRoute = require("./Routes/login");
app.use("/api/login", loginRoute);

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
