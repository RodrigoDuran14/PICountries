const { Router } = require('express');
const axios = require('axios');
const {Country, Activity} = require('../db.js');
require('dotenv').config();
const {URL_API} = process.env;

const router = Router();

router.get('/', async (req,res,next)=>{
    res.send('hola')
})

const getApiInfo = async () => {
  const apiAll = await axios.get(`${URL_API}/all`);

}

module.exports = router;