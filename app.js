const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('connected to Database' + config.database);
})
const app = express();

const users = require('./routes/users');

//Port Info
const port = 3001;


//CORS Middleware
app.use(cors());

//Set Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json())

app.use('/users', users);

//Index Route
app.get('/', (req,res) => {
	res.send('Invalid Endpoint');
})

//Server Start
app.listen(port, () => {
	console.log(`Server started on ${port}`)
})