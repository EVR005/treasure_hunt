var logger = require("../../utils/log")(module);

const bcrypt = require("bcrypt");
const saltRounds = 10;
const { userLogin } = require("../../models/userlogin");
const { playerDetails } = require("../../models/player_details");
// const { password } = require(".");
// const { SetPassword } = require("./password");

const CreateAccount = async (req, res) => {
  try {
    const data = await userLogin.findOne({
      where: { username: req.body.username },
    });
    // console.log("bii");
    // console.log(data);
    logger.info(req.body.username);
    if (data && data.username == req.body.username) {
      return res.status(413).send({ message: "user already exists!" });
    }
    const newPassword = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (newPassword !== confirmpassword) {
      return res.status(400).send({ message: "Invalid Credentials" });
    } else {
      //set ExpireTime to zero - to make it invalid - one time use
      //   await obj.update({
      //     expireTime: 0,
      //   });
      await bcrypt.genSalt(saltRounds, async (err, salt) => {
        await bcrypt.hash(newPassword, salt, async (err, hashedPassword) => {
          if (err) {
            logger.error(err);
            return res.status(500).send({ message: "Server Error." });
          } else {
            //update hash password in db table
            // await userLogin
            //   .update(
            //     { password: hashedPassword },
            //     { where: { username: req.body.username } }
            //   )
            //   .then((result) => {
            //     console.log(`Updated ${result[0]} record(s)`);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
            bcrypt.compare(newPassword, hashedPassword, function (err, result) {
              console.log("EVR", result);
            });
            const newuser = await userLogin.create({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              phone: req.body.phone,
              admin: false,
            });
            const newplayer = await playerDetails.create({
              userloginId: newuser.id,
              score: 0,
              wronghits: 0,
              gametime: 0,
            });
            // .then((data) => {
            //   console.log("id :" + data.dataValues.id);
            //   playerDetails
            //     .create({
            //       userloginId: data.dataValues.id,
            //     })
            //     .then((data) => console.log("Player Details Initialized!"))
            //     .catch((err) =>
            //       console.log("Error occured in player creation!")
            //     );
            // })
            // .catch((err) =>
            //   console.log("Error occured in user creation :" + err)
            // );
            // await playerDetails
            //   .create({
            //     username: req.body.username,
            //   })
            //   .then(() => console.log("user created!"))
            //   .catch((err) =>
            //     console.log("Error occured in user creation :" + err)
            //   );

            return res.status(200).send({ message: "Success" });
          }
        });
      });
    }
    //get details - check if it's already exists
    //create new entry with new details

    // await userLogin
    //   .create({
    //     username: req.body.username,
    //     password: req.body.password,
    //     email: req.body.email,
    //   })
    //   .then(() => console.log("user created!"))
    //   .catch((err) => console.log("Error occured in user creation :" + err));
    // return res.status(200).send({ message: "Success" });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ message: "Server error" });
  }
};
module.exports = CreateAccount;
