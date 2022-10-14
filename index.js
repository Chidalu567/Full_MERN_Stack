const express = require('express'); // require express
const app = express(); // --- create an express app instance
const helmet = require('helmet'); // ---- helmet js for security purposes
const dotenv = require('dotenv'); // ---- dotenv
const externalRouter = require('./routers/products');
const clientRouter = require('./routers/client');
const swaggerUI = require('swagger-ui-express'); // ---- docs UI
const swaggerDocs = require('swagger-jsdoc'); // ---- doc specs
const passport = require('passport');

// mongodb configuration and connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/store');// connect to the mongodb drivers
mongoose.connection.once('open', () => {
    console.info('Connected to the database already');
})

// ---- configure environmental variables --------------------------------
dotenv.config();


// ---- middlewares for routes and request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ---- All external routes
app.use('/api/products', externalRouter); // --- use External router
app.use('/api', clientRouter);

// passport strategy configuration
require('./Auth/passportConfig.js')


// -------- All security middlewares
app.use(helmet.noSniff()); // ---- Avoid port sniffing issues
app.use(helmet.hidePoweredBy()); // ---- Hide the server used to create this application
app.use(helmet.xssFilter()); // ---- Avoid cross site scripting
app.use(helmet.contentSecurityPolicy()); // ---- content Security Policy
app.use(passport.initialize()); // ----- initilize passport authentication middleware

// setup the swagger doc specifications
const options = {
    definition: { // ------- definition of the docs
        openapi: "3.0.0", // ----- openapi version
        info: { // ---- Information about the project
            title: "Products", // ---- Title of the doc
            version: "1.0.0", // ----- Version of the doc
            description:"Products Api documentation", // ------ description of the documentation
        },
        servers: [ // listed servers
            {
                url:"http://localhost:5000/api/products"
            }
        ]
    },
    apis:["./routers/*.js"], // ---- directory to all our routes
}
const specs = swaggerDocs(options);
app.use('/api/swagger-docs', swaggerUI.serve, swaggerUI.setup(specs)); // ---- swagger docs endpoints

// ----- protected routes --------------------------------
app.use('/secret', passport.authenticate('jwt', { session: false }),clientRouter);
const PORT = process.env.PORT || 5000; // ---- Port number for listening

app.listen(PORT, 'localhost', () => {
    console.log(`Server running on port ${PORT}`);
})