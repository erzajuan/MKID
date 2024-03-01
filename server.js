require("dotenv").config();

const express = require("express");
const server = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public')); 
server.use('/assets', express.static('assets'))

const routes = require('./routes');
server.use(routes);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
})
