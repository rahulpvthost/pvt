const express= require('express');
const app= express();
const userrouter= require('./routes/userRoute');
 app.use(express.json());

 app.use('/api/v1/users',userrouter);

module.exports =app;