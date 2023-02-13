const router = require("express").Router();
const Strain = require("../models/strain");

router.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Internal Sever Error" });
  }
});

router.get("/api/strains/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Strain.findById(id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Sever Error" });
  }
});

module.exports = router;
