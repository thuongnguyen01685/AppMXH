const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//router
app.use("/api", authRouter);
app.use("/api", userRouter);

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

app.listen(port, () => {
  console.log("Server is running on port", port);
});
