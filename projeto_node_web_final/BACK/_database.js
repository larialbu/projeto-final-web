const pg = require('pg');

const client = new pg.Client({
    user: 'unlkzhlh',
    host: 'motty.db.elephantsql.com',
    database: 'unlkzhlh',
    password: 'y5eugDoun7Opy_HzeNqz_l-g6KdLVEEz',
    port: 5432,

});

module.exports = client;