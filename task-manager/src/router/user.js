const { Router } = require("express");
const express = require("express");
const user = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
// router.get("/test", (req, res) => {
//   res.send("from a new file");
// });

// End-point for Writing a particular user (WITH ASYNC-AWAIT)

user.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(404).send(e);
  }
});

// End -point for getting all users

user.get("/users", auth, async (req, res) => {
  // console.log(req.body);

  try {
    const userList = await User.find();
    console.log("user list", userList);
    console.log("asdf");
    let test = [];
    test.push({ ...userList[0] });
    // console.log("test", test[0]._doc);
    res.send(userList);
  } catch (e) {
    res.send(e);
  }
  // User.find()
  //   .then((users) => {
  //     console.log(users);
  //     res.send(users);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

// End-point for getting profile
user.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// End-Point for getting user with id .

user.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

// Making an end-point for the updating a records
user.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // const user = await User.findById(req.params.id);

    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Deleting the user end-point

user.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// making an end-point for the login
user.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// End-point for the logout the user

user.post("/users/logout", auth, async (req, res) => {
  try {
    console.log(req.user.tokens);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    console.log(req.user.tokens);
    await req.user.save();
    res.send("You are logged out");
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

// End-point for logoutAll from the all endpoint for the particular user.
// All the login token for this tokens is removed
user.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("You Logged out from all points");
  } catch (e) {
    res.status(500).send();
  }
});

//End-point for uploading an file
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
// For storing image in local directory
// const upload = multer({
//   dest: "avatars",
//   limits: {
//     fileSize: 1000000000,
//   },
//   fileFilter(req, file, cb) {
//     // if (!file.originalname.match(/\.(.png|.jpg|.jpeg)$/)) {
//     if (!file.originalname.endsWith(".jpg")) {
//       return cb(new Error("please upload a word document"));
//     }
//     cb(undefined, true);
//   },
// });
const errorMiddleware = (req, res, next) => {
  throw new Error("From my middleware");
};

user.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send(error.message);
  }
);

// Delete end-point in user file upload
user.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// serving the profile you uploaded
user.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = user;
