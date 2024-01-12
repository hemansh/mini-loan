const express = require('express');
const cors = require('cors');
const config = require('dotenv').config()
const routes = require('./routes/index.js');
const db = require('./models');
const cookieParser = require("cookie-parser");
const swaggerdoc = require('swagger-jsdoc');
const swagger = require('swagger-ui-express');
const app = express();
const port = process.env.PORT || 3001

const corsConfig = {
    credentials: true,
    origin: true,
};

const swaggeroptions={
    definition:{
        openapi: "3.1.0",
        info:{
            title: "Mini Loan application API doc",
            version: "1.0",
        },
        servers: [{
            url: 'http://localhost:3001/' 
        }]
    },
    apis: ["routes/*.js"],
}

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const spcs = swaggerdoc(swaggeroptions);
app.use('/api-docs',swagger.serve,swagger.setup(spcs));

(async ()=>{
    await db.sequelize.sync();
})();

app.use('/api',routes);

app.listen(port,()=>{
    console.log('miniloan backend listening on port '+port)
})