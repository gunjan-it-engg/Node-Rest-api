const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

var id = new ObjectID();
// console.log(id.id.length);
// console.log(id.getTimestamp());
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewURLParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect with database");
    }
    const db = client.db(databaseName);
    const users = db.collection("users");

    // users.insertOne({
    //   _id: id,
    //   name: "Sanjay Kumawat",
    //   age: "21",
    //   address: "udaipur",
    //   college: "SITE",
    //   Company: "LA-NET SOFT. SOL. PVT. LTD SURAT",
    // });

    const user = users.findOne({
      _id: new ObjectID("613ca1383944ac38e704a97d"),
      if(error) {
        return console.log("unable to fetch");
      },
    });
    user.then((u) => console.log(u));

    const task = db.collection("tasks");

    // const home = task.find({ completed: false }).toArray((error, users) => {
    //   console.log(users);
    // });

    // // home.then((v) => console.log(v));

    // task.insertMany([
    //   {
    //     description: "clean the house",
    //     completed: false,
    //   },
    //   {
    //     description: "clean the office",
    //     completed: false,
    //   },
    // ]);

    users
      .updateOne(
        { _id: new ObjectID("613ca1383944ac38e704a97d") },
        { $set: { age: 25, name: "usha aswani" } },
        { upsert: true }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    users
      .deleteMany({ _id: new ObjectID("613ca1383944ac38e704a97d") })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    task
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
