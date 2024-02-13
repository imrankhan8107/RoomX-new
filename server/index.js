const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoute = require("./routes/admin.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const { verifyAdmin, verifyUser } = require("./middlewares/verifyLogin");
// const { handle404, handle500 } = require('./controllers/errorController');

const PORT = 8001;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/admin", verifyAdmin, adminRoute);
app.use("/api/room", userRoute);
// app.use("/api/user", verifyUser, userRoute);

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });
