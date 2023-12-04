require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const router = require('./routes/apiRouter')

app.use(cors());
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencodeda
app.use(express.json()); // parse application/json
app.use(morgan('dev'));

app.use('/apiv1/', router)
app.get('/', (req, res) => {
    res.json("Hello")
})
app.use('/', () => {
    console.log("hello");
})

module.exports = app;
