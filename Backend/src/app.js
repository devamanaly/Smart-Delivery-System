const express =require('express')
const cors = require('cors')
const dotenv = require('dotenv')
require('dotenv').config();
const authRoute = require('./routes/auth')
const App = express();
// const winston = await import('winston');

const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

App.use(cors())
App.use(express.json())



App.use((req,res,next)=>{
    logger.info(`${req.method} ${req.url} `)
    next();
})

App.use('/auth', authRoute)

App.use((err,req,res,next)=>{
    // logger.error(err.message);
    res.status(500).json({ error: `Internal server error ${err}` });
}); 

module.exports= App ;