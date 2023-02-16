//modules
require("dotenv").config({ path: './.env' });
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

// routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const strainRoutes = require("./routes/strain");

// Database
connection();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://sams-cannabis-store.netlify.app/",
      "http://localhost:3000/",
    ],
  })
);


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/strains", strainRoutes);

app.get("/", (req, res) => {
  return res.status(200);
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
