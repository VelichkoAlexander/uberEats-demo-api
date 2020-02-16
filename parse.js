const request = require("request-promise");
const cheerio = require("cheerio");
const debug = require("debug")("uberEats");

const url = `https://mariupol.mixfood.ua/`;

const parse = async () => {
  const response = await request(url);

  let $ = cheerio.load(response);

  const cafeCard = $(".cafe-card");
  cafeCard.each((i, card) => {
    console.log(
      $(card)
        .find(".cafe-card__title")
        .text()
    );
  });
  // console.log(container);
};

parse();
