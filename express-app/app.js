const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://${process.env.USERNAME}:${process.env.USERPW}@cluster0.8bpok.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    app.listen(3000);
  })
  .catch((err) => console.error(err));

// register view engine
app.set("view engine", "ejs");
// defaultではviewsフォルダを見にいく 設定を変更するなら以下
// app.set("views", "hogehoge");

// listen for requests

// middleware & static files
// publicフォルダをstaticなものとして読み込む
app.use(express.static("public"));
// formの情報を拾えるようにする req.bodyに入る
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog !!!",
    snippet: "about my new blog",
    body: "more about my new blog"
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5f7c0953ce2792c84dcf04dd")
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
});

app.use((req, res, next) => {
  console.log("in the next middlewware");
  next();
});

// routes
// "/"へのgetメソッド
app.get("/", (req, res) => {
  // res.send({ id: "hoge" });
  // res.send("<p>home page</p>");
  // res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("blogs");
});

// app.use((req, res, next) => {
//   console.log("after home path");
//   next();
// });

app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("blogs");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.error(err);
    });
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
