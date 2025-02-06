var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about')
  console.log('Usuário entrou em About')
});

module.exports = router;