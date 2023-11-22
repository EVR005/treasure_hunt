const { Clues } = require("../models/clues");
var logger = require("../utils/log")(module);
const sequelize = require("sequelize");

const express = require("express");
const router = express.Router();
const {
  singleImageUpload,
  removeImage,
} = require("../controllers/uploadImage");

router.post("/setclue", (req, res) => {
  singleImageUpload(req.body.image)
    .then((url) => {
      res.send({ image: url });
    })
    .catch((err) => res.send({ msg: "size is too much!!!" }));
});

router.post("/setclue2", async (req, res) => {
  console.log(req.body);
  const clueCount = await Clues.count();
  const clue = await Clues.create({
    image: req.body.image,
    clue: req.body.clue,
    clue_no: clueCount + 1,
    answer: req.body.answer,
    right_path: req.body.right_path,
  })
    .then((res) => res.send("Clue added Successfully!"))
    .catch((err) => res.send({ msg: "size is too much!!!" }));
});

router.get("/loadclue", async (req, res) => {
  await Clues.findOne({ where: { clue_no: req.query.score } })
    .then((clues) => res.send(clues))
    .catch((err) => console.log(err));
});

router.get("/getclues", async (req, res) => {
  await Clues.findAll({ order: [["clue_no", "ASC"]] })
    .then((clue) => res.send(clue))
    .catch((err) => console.log(err));
});

router.delete("/deleteClue", async (req, res) => {
  const dummy = await removeImage(req.query.url);
  const dummy1 = await Clues.destroy({
    where: { id: req.query.index },
  })
    .then((clue) => res.send({ msg: "clue deletd successfully" }))
    .catch((err) => res.send({ errm: "error in clue deletion" }));
});

router.get("/moveup", async (req, res) => {
  const dummy = await Clues.update(
    { clue_no: req.query.cur_clue },
    { where: { id: req.query.prev } }
  );
  const dummy1 = await Clues.update(
    { clue_no: req.query.prev_clue },
    { where: { id: req.query.index } }
  )
    .then((clue) => res.send({ msg: "clue moved up successfully" }))
    .catch((err) => res.send({ errm: "error in clue movement" }));
});

router.get("/movedown", async (req, res) => {
  const dummy = await Clues.update(
    { clue_no: req.query.cur_clue },
    { where: { id: req.query.next } }
  );
  const dummy1 = await Clues.update(
    { clue_no: req.query.next_clue },
    { where: { id: req.query.index } }
  )
    .then((clue) => res.send({ msg: "clue moved down successfully" }))
    .catch((err) => res.send({ errm: "error in clue movement" }));
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
