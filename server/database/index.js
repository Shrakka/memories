const { buildDatabaseWrapper } = require("./buildDatabaseWrapper");

Object.assign(module.exports, {
    db: buildDatabaseWrapper()
});
