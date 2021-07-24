const { db } = require("../../database");

Object.assign(module.exports, { createStatistic });

async function createStatistic(userName, completionTimeMS) {
    const [insertedStatistic] = await db.query(`
        INSERT INTO statistics(username, completion_time_ms)
        VALUES ($1, $2)
        RETURNING *;
    `, [userName, completionTimeMS]);

    return {
        id: insertedStatistic.id,
        userName: insertedStatistic.username,
        completionTimeMS: insertedStatistic.completion_time_ms
    };
}
