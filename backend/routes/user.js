const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

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
      msg: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken ",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

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

router.post("/signin", authMiddleware, async (req, res) => {
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

const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      msg: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    msg: "Updated Successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.params.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
