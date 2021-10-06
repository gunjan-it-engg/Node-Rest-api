const { response } = require("express");
const express = require("express");
const { update } = require("./models/tasks");
// const Task = require("./models/tasks");
require("./db/mongoose");
// const User = require("./models/user");

// importing the separate route files of the user and task .
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// for disable the all routes in application.

// app.use((req, res, next) => {
//   res.status(503).send("site is currently down, Check back soon");
// });

// For disable the get request .

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });

app.listen(port, () => {
  console.log("server is on the" + port);
});

// hashing password for security

// const bcrypt = require("bcrypt");
// const { ConnectionPoolClosedEvent } = require("mongodb");

// const myFunction = async () => {
//   const password = "gunjan1234!";
//   const hashPassword = await bcrypt.hash(password, 11);

//   console.log(password);
//   console.log(hashPassword);

//   const isMatch = await bcrypt.compare("gunjan1234!", hashPassword);
//   console.log(isMatch);
// };

// myFunction();

// Code  Example for JSON-WEBToken
// const jwt = require("jsonwebtoken");

// const tokenFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "gunjanshrimali", {
//     expiresIn: "5 second",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "gunjanshrimali");
//   console.log(data);
// };
// tokenFunction();

//For Find the task using the user id (Proves the user&task relationship).
// const Task = require("./models/tasks");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("6156d7ccd6bf3d07274d4668");
//   // await task.populate("owner");
//   // console.log(task.owner);
//   const user = await User.findById("6156a043d48f6de33a3f1838");
//   await user.populate("tasks");
//   console.log(user.tasks);

//   // console.log(user);
//   // console.log(user.tasks);
// };

// main();

// const multer = require("multer");
// const upload = multer({ dest: "images" });
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send();
// });
console.log("hi");
