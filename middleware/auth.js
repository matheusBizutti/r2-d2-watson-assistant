const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
  const token_header = req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s/, '') : '';

  if (!token_header) return res.status(401).send({message: 'Authentication failed token is required in header.'});

  jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
    if (err) return res.status(401).send({message: err.message});

    res.locals.auth_data = decoded['id'];
    return next();
  });
}

module.exports = auth;