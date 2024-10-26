const express = require('express'); // Import the express package
const path = require('path'); // Import the path package
const cookieParser = require('cookie-parser'); // Import the cookie-parser package
const logger = require('morgan'); // Import the morgan package
const config = require('./config/production.json'); // Import the config package
const cors = require('cors'); // Import the cors package
const mongoose = require('mongoose');

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

const orderRouter = require('./routes/api/v1/orders');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/messages', orderRouter);

module.exports = app;
