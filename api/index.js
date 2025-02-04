const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// * DB
mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database - Congrats!"));

// * CORS
app.use(cors());

// * body parser
app.use(express.json());

// * routes
app.get("/", (req, res) => {
  res.write("Api routes:\n\n");
  res.write("GET /api/users - get all users\n");
  res.write("POST /api/users - create a new user\n");
  res.write("DELETE /api/users/:id - delete a user \n\n");
  res.write("POST /api/auth/login - login a user\n");
  res.write("POST /api/auth/register - register a new user");
  res.end();
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// * LOGS
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
