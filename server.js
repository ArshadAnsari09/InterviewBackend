const env = require("./lib/config/env");

const connectDB = require("./lib/config/dbConfig");

connectDB((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        const express = require("express");
        const cors = require("cors");
        const app = express();

        // Middleware
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Routes
        const routes = require("./lib/routes");
        routes(app);

        app.listen(env.port || 4000, () => {
            console.log(`Server is running on port ${env.port}`);
        });
    }
});