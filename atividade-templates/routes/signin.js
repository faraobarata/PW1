var express = require('express');
var router = express.Router();

/* GET user welcome message by user ID */
router.get('/:userid?', function(req, res, next) {
  const userid = req.params.userid;

  console.log('Received userid:', userid);

  if (userid) {
      res.render('signin', `Bem-vindo, usuário ${userid}!`, {title: userid});
  } else {
      res.redirect('/users/signup');
  }
});

module.exports = router;