const express = require("express");
const app = express();
const post = 8000;
const db = require("./mongoose");
const expressHbs = require("express-handlebars");
const sanphammodel = require("./sanphamModel");
const bodyParser = require("body-parser");
const { mongoosetoObject } = require("./tomongoose");
const methodOverride = require("method-override");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOverride("_method"));
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: "views/layouts/",
    helpers: { sum: (a, b) => a + b },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
db.connect();
app.get("/", (req, res) => {
  sanphammodel.find({}).then((users) => {
    res.render("listsp", { users: users.map((user) => user.toJSON()) });
  });
});
app.get("/addUser", (req, res) => {
  res.render("addsp");
});
app.post("/addUser", async (req, res) => {
  const u = new sanphammodel(req.body);
  console.log(req.body);
  try {
    await u.save();
    res.redirect("/");
  } catch (error) {
    res.status(404).send(error);
  }
});
app.get("/:id/editsp", (req, res, next) => {
  sanphammodel
    .findById(req.params.id)
    .then((sanPham) =>
      res.render("editsp", {
        sanPham: mongoosetoObject(sanPham),
      })
    )
    .catch(next);
});
app.put("/:id", (req, res, next) => {
  sanphammodel
    .updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/"))
    .catch(next);
});
app.delete("/:id", (req, res, next) => {
  sanphammodel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("back");
    })
    .catch(next);
});
app.listen(post, () => console.log(`localhost dang chay cong:${post}`));
