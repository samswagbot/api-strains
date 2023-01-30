const express = require("express");
const app = express();

// Database
const mongoose = require("mongoose");
const db =
  "mongodb+srv://sammossallam:Apple516@cluster0.unumwyo.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 2000;

const Strain = require("./models/strain");

mongoose
  .connect(db, {
    dbName: "cannabis",
  })
  .then((result) =>
    app.listen(PORT, () =>
      console.log(`Listening on port ${PORT} and connected to db`)
    )
  )
  .catch((err) => console.error(err));

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200);
});

app.get("/api/strains", (req, res) => {
  const { name, type, range } = req.query;
  const namePattern = new RegExp(name, "i");
  const typePattern = new RegExp(type, "i");
  if (name || type || range > 0) {
    if (range > 0) {
      Strain.find({ name: namePattern, type: typePattern })
        .sort()
        .then((result) => {
          res.send(result.splice(0, range));
        });
    } else {
      Strain.find({ name: namePattern, type: typePattern })
        .sort()
        .limit(50)
        .then((result) => {
          res.send(result);
        });
    }
  } else {
    Strain.find()
      .limit(50)
      .then((result) => {
        res.send(result);
      });
  }
});

app.get("/api/strains/:id", (req, res) => {
  const { id } = req.params;
  Strain.findById(id).then((result) => {
    res.send(result);
  });
});
