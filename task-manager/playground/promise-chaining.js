require("../src/db/mongoose");
const User = require("../src/models/user");
User.findByIdAndUpdate("61514cb88d41f3933846846c", {
  name: "sanjay kumawat",
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ name: "sanjay kumawat" });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
