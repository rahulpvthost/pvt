const express= require('express');
const app= express();
const cookieParser = require('cookie-parser');
const userrouter= require('./routes/userRoute');
const postrouter= require('./routes/postRoute');

 app.use(express.json());

 app.use(cookieParser());

 app.use('/api/v1/users',userrouter);
 app.use('/api/v1/posts',postrouter);

module.exports =app;