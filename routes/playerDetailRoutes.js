const { playerDetails } = require("../models/player_details");
const { userLogin } = require("../models/userlogin");
var logger = require("../utils/log")(module);
const sequelize = require("sequelize");

const express = require("express");
const router = express.Router();
// const Login = require("../controllers/auth/login");
const auth = require("../controllers/auth");
const authValidator = require("../validators/authValidator");
const { validate } = require("../validators/index");

router.get("/playerdetail", (req, res) => {
  playerDetails
    .findAll({
      include: [
        {
          model: userLogin,
          attributes: ["username"],
          where: { admin: false },
        },
      ],
      order: [
        ["score", "DESC"],
        ["wronghits", "ASC"],
        [userLogin, "username", "ASC"],
      ],
      attributes: ["score"],
      offset: req.query.index * 10,
      limit: 10,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error finding users", err);
    });
});

router.get("/currentplayer", (req, res) => {
  console.log("niii");
  console.log(req.query);
  playerDetails
    .findOne({ where: { id: req.query.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send({ message: err }));
});

router.get("/currentuser", (req, res) => {
  userLogin
    .findOne({ where: { id: req.query.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send({ message: err }));
});

router.post("/updatescore", (req, res) => {
  playerDetails
    .update(
      { score: req.body.score, wronghits: req.body.wronghits },
      { where: { id: req.query.id } }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send({ message: err }));
});

router.get("/getcount", async (req, res) => {
  //   await playerDetails
  //     .count()
  //     .then((cnt) => res.send(cnt))
  //     .catch((err) => console.log(err));
  // });
  playerDetails
    .findAll({
      attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
    })
    .then((result) => {
      // console.log(`There are ${result[0].dataValues.count} entries in the my_models table`);
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
