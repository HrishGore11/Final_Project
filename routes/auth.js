const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_key = "sdfghjkla@$%&";

// const { create } = require("../models/user");

////////////////////////////////////signUp Route:
/////////////////////////http://localhost:9046/api/auth/signUp
router.post(
  "/signUp",

  [
    body("username", "please enter a valid user name ").isLength({ min: 5 }),
    body("email", "please enter a valid email ").isEmail(),
    body("password", "please enter a valid password ").isLength({ min: 5 }),
  ], //// For Validation

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //   let createUser = await User.findOne({
      //     email: req.body.email,
      //   });
      //   if (createUser) {
      //     res.json({ message: "user already Exists", success: false });
      //   }
      let createUser = await User.findOne({ email: req.body.email });
      if (createUser) {
        return res
          .status(400)
          .json({ success: false, message: "the user is already exist" });
      }
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(password, salt);
      createUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      createUser.save();
      //   console.log(req.body);
      res.json({ message: "succesfully created User", data: createUser });
    } catch (error) {
      console.error(errors);
      res.status(500).send("internal server error");
    }
  }
);
//////////////////////////////////////////////////////////////////login Route :
///////////////////////// http://localhost:9046/api/auth/login

router.post(
  "/login",
  [
    body("email", "please enter a valid email ").isEmail(),
    body("password", "please enter a valid password ").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Please enter registered email" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(401)
          .json({ success: false, message: "incorrect Password" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const authtoken = jwt.sign(payload, jwt_key);

      res.json({
        message: "Token created succesfully",
        data: authtoken,
      });
      console.log(authtoken);
    } catch (error) {
      console.error(errors);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
