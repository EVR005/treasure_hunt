const { Clues } = require("../models/clues");
var logger = require("../utils/log")(module);
const sequelize = require("sequelize");

const express = require("express");
const router = express.Router();
const { singleImageUpload } = require("../controllers/uploadImage");

router.post("/setclue", (req, res) => {
  singleImageUpload(req.body.image)
    .then((url) => res.send({ image: url }))
    .catch((err) => res.status(500).send(err));
});

router.post("/setclue2", async (req, res) => {
  console.log(req.body);
  const clue = await Clues.create({
    image: req.body.image,
    clue: req.body.clue,
    answer: req.body.answer,
    right_path: req.body.right_path,
  });
  //   .then((res) =>
  //     console.log("Clue added Successfully!").catch((err) => console.log(err))
  //   );
});

router.get("/loadclue", async (req, res) => {
  await Clues.findOne({ where: { id: req.query.score } })
    .then((clue) => res.send(clue))
    .catch((err) => console.log(err));
});

router.get("/getmax", async (req, res) => {
  // await Clues.count()
  //   .then((cnt) => res.send(cnt))
  //   .catch((err) => console.log(err));
  Clues.findAll({
    attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
  })
    .then((result) => {
      // console.log(`There are ${result[0].dataValues.count} entries in the my_models table`);
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
