const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// - TEST ENVIRONMENT APIs

router.get('/test', auth, (req, res) => {
  console.log('userID: ', res.locals.auth_data);
  return res.status(200).send({message: 'Method GET with authentication in `/` is ok.'})
});

router.get('/test', (req, res) => {
  console.log('userID: ', res.locals.auth_data);
  return res.status(200).send({message: 'Method GET without authentication in `/` is ok.'})
});

module.exports = router;
