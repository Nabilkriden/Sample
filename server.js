const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

const chatroomRoute = require("./routes/chatRoom");
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
//web soket
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUsers = (userId, socketId, userData) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId, userData });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId, userData) => {
    addUsers(userId, socket.id, userData);
    io.emit("listOfUsers", users);
  });

  socket.on("sendMessage", (data, reciverId) => {
    reciverId.forEach((element) => {
      const user = getUser(element);
      user && io.to(user.socketId).emit("getMessage", data);
    });
  });

  socket.on("newRoom", (room, reciverId) => {
    const user = getUser(reciverId);
    user && io.to(user.socketId).emit("getRoom", room);
  });

  socket.on("onDeleteroom", (room, reciverId) => {
    reciverId.forEach((element) => {
      const user = getUser(element);
      user && io.to(user.socketId).emit("roomDeleted", room);
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("listOfUsers", users);
  });
});
// Inv Users

app.use("/api/invite", newUserRoute);
// User Login

app.use("/api/login", loginRoute);
app.use("/api/room", chatroomRoute);
app.use("/api/message", chatMessageRoute);

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
