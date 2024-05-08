const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const { User } = require("../db");

const router = express.Router();

const signupInput = z.object({
  username: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinInput = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Invalid Inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
      token,
    });
    return;
  }

  res.json({
    msg: "Error while loggin in",
  });
});

module.exports = router;
