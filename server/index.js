const express = require("express");
const app = express();
const PORT = 4000;
const CLIENTURL = "http://localhost:3000";
const cors = require("cors");

const http = require("http").Server(app);
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: CLIENTURL,
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //sends the message to all the users on the server
  socket.on("message", (data) => {
    console.log(data);
    socketIO.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🚫: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

// Route for user registration
app.post("/register", express.json(), (req, res) => {
  const { username, password } = req.body;

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const newUser = { username, password, socketID: null };
  users.push(newUser);
  console.log(users);
  // Respond with the newly registered user
  res.json(newUser);
});

// Route for user login
app.post("/login", express.json(), (req, res) => {
  const { username, password } = req.body;

  // Find the user in the array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Respond with the logged-in user
  console.log("user found");
  res.json(user);
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
