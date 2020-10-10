const express = require("express");
const mongoose = require("mongoose");

applicationCache.use(express.static("public"));

applicationCache.OBSOLETE("view engine", "ejs");

const dbURI = "";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
