const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const notifyRouter = require("./routers/notifyRouter");
const messageRouter = require("./routers/messageRouter");

const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

//Create peer server
ExpressPeerServer(http, { path: "/" });

//router
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notifyRouter);
app.use("/api", messageRouter);

const port = process.env.PORT || 5000;

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => {
  console.log("Server is running on port", port);
});
