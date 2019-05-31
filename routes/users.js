const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const users = require('./../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const createUserToken = (userID) => {
  return jwt.sign({id: userID}, config.jwt_pass, {expiresIn: config.jwt_expires_in});
}

router.get('/', auth, async (req, res) => {

  try {
    const _users = await users.find({});
    return res.status(200).send(_users);
  } catch (err) {
    return res.status(409).send({error: 'error in query users.', message: err});
  }

});

router.post('/delete', auth, async (req, res) => {

  const { email, password } = req.body;

  if(!email || !password) return res.status(400).send({ error: 'Invalid data in the body. email and password is required.'});

  try {

    const user = await users.findOne({ email }).select('+password');

    const pass_ok = await bcrypt.compare(password, user.password);

    if (!user) return res.status(400).send({error: 'User not register.'});
    if (!pass_ok) return res.status(401).send({error: 'Invalid password.'});

    users.updateOne({email}, {
      deleted: true
    }, (err) => {
      if (err) return res.status(500).send({message: err.message});
  
      return res.status(200).send({message: `User ${email} delete with success.`});
    });
  } catch (err) {
    return res.status(409).send({error: 'error in delete users.', message: err});
  }

});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.send({error: 'Invalid data in the body.'});

  try {
    if (await users.findOne({email})) return res.send ({error: 'User exists in database'});

    const user = await users.create(req.body);
    return res.status(201).send({user, token: createUserToken(user.id)})
  } catch (err) {
    return res.status(500).send({error: 'Error in create user.'});
  }

});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400).send({ error: 'Invalid data in the body.'});

  try {
    const user = await users.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({error: 'User not register.'});
    if (user.deleted) return res.status(400).send({type: 'Auth error', message: `User: ${user,email} is deleted.`});

    const pass_ok = await bcrypt.compare(password, user.password);

    if (!pass_ok) return res.status(401).send({error: 'Invalid password.'});

    return res.status(201).send({user, token: createUserToken(user.id)})
  } catch (err) {
    return res.send({error: err}); 
  }

});

module.exports = router;
