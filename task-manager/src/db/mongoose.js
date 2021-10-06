const mongoose = require("mongoose");
const validator = require("validator");

// mongoose.connect("mongodb://127.0.0.127017/task-manager-apis");
try {
  mongoose.connect(process.env.MONGODB);
  console.log("connection established");
} catch (e) {
  console.log(e.message);
}
// so here we can creating a model with connection

// // here we can pass the data to the model for sending into the db.
// const me = new User({
//   name: "   Gunjan-shrimali    ",
//   email: "Gunjan.it.engg@gmail.com",
//   password: "gujan",
// });

// // the returning a promice for saving into the database

// me.save()
//   .then((mep) => {
//     console.log(mep);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
