const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("/weather", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Akinola Gabriel",
  });
  // const address = req.query.address;

  // if (!address) {
  //   return res.send({ error: "You must provide an address" });
  // }

  // geocode(address, (err, { latitude, longitude, location } = {}) => {
  //   if (err) {
  //     console.log({ err });
  //     return res.send({ err });
  //   }
  //   weather(latitude, longitude, (err, forecastdata) => {
  //     if (err) {
  //       return res.send({ err });
  //     }
  //     res.send({ forecastdata, location, address });
  //   });
  // });
});

app.get("*", (req, res) => {
  res.render("404page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
