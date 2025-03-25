const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", usersRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0.5sc38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen("3000", () => {
      console.log("server on");
    });
  });
