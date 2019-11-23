const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const methodOverride = require('method-override');

// Routes
const users = require('./routes/api/users');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {pingTimeout: 60000});

// Websockets
// require('./socket')(io)

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongodb
mongoose.connect(db, { useFindAndModify: false });

// Passport middleware
app.use(passport.initialize());

app.use(cors());
app.use('/static',express.static(path.join(__dirname, 'static')));

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);

// Heroku settings
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;