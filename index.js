const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const router = express.Router();
app.use("/v1", router);

const collections = {
  places: require("./data/places.json")
};

router.get("/places", (req, res) => {
  const { limit = 9, offset = 0 } = req.query;

  if (collections.places) {
    const items = collections.places;

    res.send({
      items: [...items].slice(offset, limit),
      total: items.length,
      limit: Number(limit),
      offset: Number(offset)
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/", (req, res) => {
  res.send({
    docs: "https://github.com/VelichkoAlexander/uberEats-demo-api",
    version: `1.0.0-${process.env.BUILD_DATE || "local"}`,
    routes: ["/v1/places"]
  });
});

app.listen(3000, () => {
  console.log("ubereats-demo-api listening on port 3000!");
});
