const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const port = 3000;

let tempDB = [
  { id: 1, promo: null },
  { id: 2, promo: null },
];

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let currPromo = findPromoByID(id);
  if (currPromo !== null) {
    res.json({ promo: currPromo });
  }
  res.send(404);
});

app.post("/users/:id", (req, res) => {
  let id = req.params.id;
  let newPromo = req.body.newPromo;
  let statusCode = updatePromoByID(id, newPromo);
  res.send(statusCode);
});

const findPromoByID = (id) => {
  tempDB.forEach((item) => {
    if (item.id === id) {
      return item.promo;
    }
  });
  return null;
};

const updatePromoByID = (id, newPromo) => {
  tempDB.forEach((item) => {
    if (item.id === id) {
      item.promo = promo;
      return 200;
    }
  });
  return 404;
};
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
