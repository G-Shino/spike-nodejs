const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
// jsonをobjに変換する
app.use(express.json());
// cookieをparseする
app.use(cookieParser());

const dbURI = `mongodb+srv://${process.env.USERNAME}:${process.env.USERPW}@cluster0.8bpok.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.error(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

// cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=false");
  res.cookie("newUser", true);
  res.cookie("isEmployee", true, { maxAge: 1000, httpOnly: true });
  res.send("you got cookies!");
});

app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
