require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const httpStatusText = require('./utils/httpStatusText');
const path = require('path');
const url = process.env.MONGO_URL ;
//const client = new MongoClient(url);
const app = express();  
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(url).then( () => {
  console.log('mongodb connected');
});


const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');


app.use(express.json());

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

//global middleware for not found router
app.use("*", (req, res, next) => {
  return res.status(404).json({status: httpStatusText.FAIL, message:'This resource is not available'});
})

//global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 400).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code : error.statusCode, data:null });
})

app.listen(process.env.PORT || 4000, () => {
  console.log("listening on port 4000");
})