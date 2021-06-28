const express = require('express');
const router = require('./server/routes/router');
const dotenv = require('dotenv');
const morgan = require('morgan');
var livereload = require('livereload');
var connectLivereload = require('connect-livereload')
const path = require('path');

const connectDB = require('./server/db/conn');

dotenv.config({path:'config.env'});
const port = process.env.PORT || 8080;

const app = express();

/**
 * @description LIVE SERVER FOR FRONTEND CHANGES
*/
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname,'assests'));
app.use(connectLivereload());

/**
 * @description LOG REQUESTS
*/
app.use(morgan('tiny'));

/**
 * @description MONGODB CONNECTION
*/
connectDB();

/**
 * @description PARSING
*/
app.use(express.urlencoded({
    extended:true
}));

/**
 * @description SET ENGINE
 * @method app.set('views',path.resolve(__dirname,"views/ejs"));  
 * // If your html/pug/ejs files are not in views folder   
*/

app.set('view engine','ejs');

/**
 * @description LOAD ASSESTS
*/
app.use('/Css',express.static(path.resolve(process.env.css)));
app.use('/Img',express.static(path.resolve(process.env.img)));
app.use('/Js',express.static(path.resolve(process.env.js)));

/**
 * @description LOAD ROUTES
*/
app.use(router);

/**
 * @description LISTEN PORT
*/
app.listen(port,()=>{
    console.log(`Server Started on Port :- ${port}`);
});