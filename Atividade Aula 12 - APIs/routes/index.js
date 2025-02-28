var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
      const bit = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
      console.log(bit.data)

      console.log("")
      let data = new Date();
      console.log(`Requisição recebida ${req.url} em`, data.toLocaleString('pt-BR'))
      console.log("")
      res.render('index', { title: 'Bitcoin Price Index', b: bit.data})
  } catch (err) {
      console.log(err)
  }
});

module.exports = router;