require("../src/db/mongoose");
const { count } = require("../src/models/tasks");
// Task find by id and delete
const Task = require("../src/models/tasks");
// Task.findByIdAndDelete("61516a1858fa14ee3387d04b")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};
deleteTaskAndCount("6140965780cf0e28f37e6a9a")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
