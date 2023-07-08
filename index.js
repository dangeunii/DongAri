const https = require('https');
const fs = require('fs');
const express = require('./config/express');
const {logger} = require('./config/winston');

const options = {
    key: fs.readFileSync("./config/cert.key"),
    cert: fs.readFileSync("./config/cert.crt"),
  };
  
  const app = express();

const port = 5000;
express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);

const httpsServer = https.createServer(options, app);

// // https 의존성으로 certificate와 private key로 새로운 서버를 시작
// https.createServer(options, app).listen(8080, () => {
//     console.log(`HTTPS server started on port 8080`);
//   });