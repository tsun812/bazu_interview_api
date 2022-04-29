const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
//app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//app.use(cors());
const User = require("./database/models").User;
const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.100:19003");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findAll({
    where: { id: req.params.id },
  })
    .then((user) => {
      let promo = user[0].dataValues.promo;
      res.json({ promo: promo });
    })
    .catch((err) => res.send(err));
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let newPromo = req.body.newPromo;
  let promo = "asdf";
  console.log(req.body);
  User.update({ promo: newPromo }, { where: { id: id } })
    .then((response) => {
      res.send(200);
    })
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
