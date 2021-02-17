const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.yhoby.mongodb.net/luizalabs');

//Carrega Models
const Product = require('./models/product');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // if(res.method === 'OPTIONS'){
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    // }
    app.use(cors());
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app