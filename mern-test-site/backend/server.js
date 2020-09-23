//Import Dependencies
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Init
const app = express();
const port = process.env.PORT | 5000;
//Bind to express
app.use(cors());
app.use(express.json());

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

app.use('/worklog', worklogRouter);
app.use('/user', userRouter);

//Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});