const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
// jsonをobjに変換する
app.use(express.json());

const dbURI = `mongodb+srv://${process.env.USERNAME}:${process.env.USERPW}@cluster0.8bpok.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
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
app.use(authRoutes);
