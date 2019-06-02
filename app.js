const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const config = require('./config/config');
const indexRoutes = require('./routes/index');
const ticketsRoutes = require('./routes/tickets');
const usersRoutes = require('./routes/users');
const watsonConversationRoutes = require('./routes/watson-conversation.js');

const url = config.db_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Connection error: ', err);
});

mongoose.connection.on('disconnected', (err) => {
  console.log('Application disconnected: ', err);
});

mongoose.connection.on('connected', () => {
  console.log('Application connected in database.')
});

// - CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.use('/', indexRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/users', usersRoutes);
app.use('/watson', watsonConversationRoutes);

app.listen(3500, () => {
  console.log('R2-D2 chatbot is running on port: 3500');
});

module.exports = app;