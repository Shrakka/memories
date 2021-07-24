require('dotenv').config(); // Load environment variables from '.env' file

const express = require('express');
const app = express();

exposeClient();
exposeAPI();
bootstrapApp();


function exposeClient() {
    const path = require("path");

    const CLIENT_BUILD = path.join(__dirname,"../client/dist");
    app.use(express.static(CLIENT_BUILD));
}

function exposeAPI() {
    const { router } = require("./api");

    app.use("/api", router);
}

function bootstrapApp() {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`)
    });
}
