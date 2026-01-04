const env = require("./lib/config/env");

const connectDB = require("./lib/config/dbConfig");

connectDB((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        const express = require("express");
        const cors = require("cors");
        const swaggerUi = require('swagger-ui-express');
        const swaggerDocument = require('./lib/swagger.json');
        const app = express();

        console.log("swaggerDocument", swaggerDocument);
        

        // Middleware
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        const options = { swaggerOptions: { validatorUrl: null}};
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
        // Routes
        const routes = require("./lib/routes");
        routes(app);

        app.listen(env.port || 4000, () => {
            console.log(`Server is running on port ${env.port}`);
        });
    }
});