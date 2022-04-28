const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

const User = require("./database/models").User;
const port = 3000;

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findAll({
    where: { id: req.params.id },
  })
    .then((user) => {
      let promo = user[0].dataValues.promo;
      res.json({ promo: promo });
    })
    .catch((err) => res.send(404));
});

app.post("/users/:id", (req, res) => {
  let id = req.params.id;
  let newPromo = req.body.newPromo;
  User.update({ promo: newPromo }, { where: id })
    .then((res) => {
      User.save();
      res.send(200);
    })
    .catch((err) => res.send(404));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
