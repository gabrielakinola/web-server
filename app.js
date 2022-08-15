const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/products", (req, res) => {
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/weather", (req, res) => {
  // const weather = [
  //   { forecast: " It is snowing", location: "philadelphia" },
  //   { forecast: "It is sunny", location: "chicago" },
  // ];

  const address = req.query.address;

  if (!address) {
    return res.send({ error: "You must provide a search term" });
  }

  geocode(address, (err, { latitude, longitude, location }) => {
    if (err) {
      console.log({ err });
      return res.send({ err });
    }
    weather(latitude, longitude, (err, forecastdata) => {
      if (err) {
        return res.send({ err });
      }
      res.send({ forecastdata, location, address });
    });
  });

  //   const searchresults = weather.filter((geo) => {
  //     return geo.location === search;
  //   });

  //   res.send(searchresults);
  //   console.log(searchresults);
  // });

  // app.get("/help", (req, res) => {
  //   res.send("Help");
  // });

  // app.get("/about", (req, res) => {
  //   res.send("About page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
