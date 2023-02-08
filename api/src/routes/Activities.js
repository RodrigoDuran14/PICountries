const {Router} = require("express");
const {Country, Activity} = require("../db.js");
const {validationPostActivity} = require("./validation")


const router = Router();

router.post("/", async (req,res,next)=>{
  try {
    const {name, difficulty, duration, season, countries} = req.body;

    validationPostActivity(req.body);

    const newActivity = await Activity.create({
        name,difficulty,duration,season
    })

    const dbcountries = await Country.findAll({
      where: {
        name: countries
      }
    })

    newActivity.addCountries(dbcountries)

    res.send(newActivity)
  } catch (error) {
    next(error)
  }
})


module.exports = router;