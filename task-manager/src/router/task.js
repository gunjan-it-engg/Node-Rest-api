const express = require("express");
const task = new express.Router();
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

task.post("/tasks", auth, async (req, res) => {
  console.log(req.body);
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user.id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// End-point for reading all task of the profile
// GET /tasks?completed=true
// GET /tasks?limit=2&skip=0
// GET /tasks?SortBy=createAt:desc (descending order)

task.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  // console.log(req.query.completed);
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.sort),
        sort: {
          completed: 1,
        },
      },
    });
    // .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

// console.log(req.body);
// Task.find({ owner: req.user._id })
//   .then((task) => {
//     console.log(task);
//     res.send(task);
//   })
//     .catch((e) => {
//       res.status(500).send(e);
//     });
// });

// End-point for reading a task using id

task.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// End-point for updating a speacific task using id

task.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

task.post("/tasks", async (req, res) => {
  console.log(req.body);
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// End-point for reading all task

task.get("/tasks", (req, res) => {
  console.log(req.body);
  Task.find({})
    .then((task) => {
      console.log(task);
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

// Deleting the task end-point

task.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = task;
