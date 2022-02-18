const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

const chatRomeRoute = require("./routes/chatRome");
const chatMessageRoute = require("./routes/chatMessage");
const loginRoute = require("./Routes/login");
const newUserRoute = require("./Routes/newUser");

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
  .catch(() => {
    console.error("Database connection error");
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, PATCH , DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Inv Users

app.use("/api/invite", newUserRoute);
// User Login

app.use("/api/login", loginRoute);
app.use("/api/room", chatRomeRoute);
app.use("/api/message", chatMessageRoute);

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
