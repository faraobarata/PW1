var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contact')
  console.log('Usuário entrou em Contact')
});

module.exports = router;