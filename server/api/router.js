const { Router, json } = require("express");
const controllers = require("./controllers");

const router = new Router();
router.use(json()); // To parse the POST request body

Object.assign(module.exports, { router });


router.get("/statistics", async (_, res) => {
    const statistics = await controllers.getStatistics();
    res.send(statistics);
});

router.post("/statistics", async (req, res) => {
    const { userName, completionTimeMS } = req.body;
    const createdStatistic = await controllers.createStatistic(userName, completionTimeMS);
    res.send(createdStatistic);
});
