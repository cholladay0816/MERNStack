//Import Dependencies
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

var genuuid = require('uid-safe')

require('dotenv').config();

//Init
const app = express();
const port = process.env.PORT | 5000;
//Bind to express
app.use(cors());
app.use(express.json());

//Establish session
var sess = {
    secret: 'keyboard cat',
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

//Connect to Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});

//Setup Routes
const worklogRouter = require('./routes/worklog');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');

app.use('/', homeRouter);
app.use('/worklog', worklogRouter);
app.use('/user', userRouter);

//Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});