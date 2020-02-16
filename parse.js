const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

const url = `https://mariupol.mixfood.ua/`;
const api = [];

const parse = async () => {
  const response = await request(url);

  let $ = cheerio.load(response, {
    xml: {
      normalizeWhitespace: true
    }
  });

  const cafeCard = $(".cafe-card");
  cafeCard.each((id, card) => {
    let domCard = $(card);
    api.push({
      id,
      title: domCard.find(".cafe-card__title").text(),
      type: domCard.find(".cafe-card__subtitle").text(),
      img: domCard
        .find(".cafe-card__image")
        .css("background-image")
        .replace(/.*\s?url\([\'\"]?/, "")
        .replace(/[\'\"]?\).*/, ""),
      price: "₴₴",
      rating: domCard
        .find(".star-rating")
        .attr("class")
        .replace(/\D/g, ""),
      reviews: domCard
        .find(".blue-lined-link")
        .text()
        .replace(/\D/g, "")
    });

    storeData(api, "./data/output.json");
  });
};

parse();

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
