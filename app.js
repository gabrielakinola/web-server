const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const publicDirectoryPath = path.join(__dirname, "./public");
const viewPath = path.join(__dirname, "./templates/views");
const partialpath = path.join(__dirname, "./templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/help", (req, res) => {
//   res.send("Help");
// });

// app.get("/about", (req, res) => {
//   res.send("About page");
// });

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
