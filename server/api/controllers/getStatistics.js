const { db } = require("../../database");

Object.assign(module.exports, { getStatistics });

async function getStatistics() {
    const statistics = await db.query(`SELECT * FROM statistics`);
    return statistics.map(stat => ({
        id: stat.id,
        userName: stat.username,
        completionTimeMS: stat.completion_time_ms
    }));
}
