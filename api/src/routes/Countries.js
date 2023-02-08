const { Router } = require("express");
const axios = require("axios");
const { Country, Activity } = require("../db.js");
require("dotenv").config();
const { URL_API } = process.env;

const router = Router();

const getApiInfo = async () => {
  const apiAll = await axios.get(`${URL_API}/all`);

  const dataFiltered = apiAll.data.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[0],
      continent: country.continents[0],
      capital: country.capital ? country.capital[0] : "doesn't have capital",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });

  await Country.bulkCreate(dataFiltered);
};

const getDbInfo = async () => {
  const db = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["id","name","difficulty", "duration", "season"],
      through: { attributes: [] },
    },

  });
  return db;
};

const verifyDb = async () => {
  const aux = await Country.count();
  if (aux < 1) await getApiInfo();
};

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;

    verifyDb();

    if (name) {
      const allCountries = await Country.findAll();

      const result = await allCountries.filter((country) =>
        country.name.toLowerCase().includes(name.toLowerCase())
      );

      result.length
        ? res.send(result)
        : res.status(404).send({
            name: "The name doesn't correspond to an existing country, please enter a valid name.",
          });
    } else {
      const countries = await getDbInfo();
      res.send(countries);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    verifyDb();

    const result = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
        attributes: ["name","difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });

    result
      ? res.send(result)
      : res
          .status(404)
          .send({
            id: "The Id doesn't correspond to an existing country, please enter a valid Id. ",
          });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
