// for better way to handel the request me can use header partial

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./geocode");

const app = express();

console.log(__dirname);
console.log(__filename);

// for header partial we are using the advance templating.
const partialsPath = path.join(__dirname, "../templating/partial");

const publicDirectoryPath = path.join(__dirname, "../public/");
console.log(publicDirectoryPath);
const viewsPath = path.join(__dirname, "../templating/views");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("/", (req, res) => {
  res.render("index", { title: "home from hbs", name: "server" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "about|maker" });
});

// this will be used for sending json formatting data in the front end.
// app.get("/weather", (req, res) => {
//   res.send({
//     name: "usha",
//   });
// });

app.get("/about", (req, res) => {
  res.render("about", { title: "about|maker", name: "about section" });
});
//app.com
//app.com/help
//app.com/about

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must need to include weather location",
    });
  }
  console.log(req.query.address);
  // Building json http responce
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    // forecast(latitude, longitude, (error, forecastData) => {
    //   if (error) {
    //     return res.send({ error });
    //   }

    // geocode("Bosten", (error, data) => {
    // res.send(console.log("Error", error));
    res.send({ data });
    // });

    // res.send({
    //   latitude: response.body.features[0].center[0],
    //   longitude: response.body.features[0].center[1],
    //   location: response.body.features[0].place_name,
    // });
  });
  // res.send({
  //   products: [
  //     {
  //       jaipur: "the pink city",
  //       rajasmand: "city of shree dwarikadish",
  //     },
  //     {
  //       gujarat: "the city of occian",
  //       mumbai: "the film city",
  //     },
  //   ],
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// js have an wield cart entry
// app.get("*", (req, res) => {

// });

app.get("*", (req, res) => {
  res.send();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server start at port 3000");
});
