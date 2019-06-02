const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const tickets = require('./../model/tickets');

router.get('/', auth, async (req, res) => {

  try {
    const _tickets = await tickets.find({});
    return res.status(200).send(_tickets);
  } catch (err) {
    return res.status(409).send({error: 'error in query tickets.', message: err});
  }

});

router.get('/detail/:code', auth, async (req, res) => {

  try {
    const _tickets = await tickets.findOne({_id: req.params.code});
    return res.status(200).send(_tickets);
  } catch (err) {
    return res.status(409).send({error: 'error in query tickets.', message: err});
  }

});

router.post('/create', auth, async (req, res) => {
  const { name, problem_description, email } = req.body;

  if(!name || !problem_description || !email) return res.send({ error: 'Invalid data in the body.'});

  try {
    const ticket = await tickets.create(req.body);

    return res.status(201).send({message: `Your ticket code is: ${ticket['id']}`});
  } catch (error) {
    return res.status(500).send({message: 'Error in create ticket.', error});
  }

});

module.exports = router;
