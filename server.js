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

//router
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notifyRouter);
app.use("/api", messageRouter);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

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

http.listen(port, () => {
  console.log("Server is running on port", port);
});
