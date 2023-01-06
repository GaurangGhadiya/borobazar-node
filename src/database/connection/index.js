const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const dbUrl = config.get('db_url');
const mongooseConnection = express()
mongoose.connect(
    dbUrl
).then(() => console.log('Database successfully connected')).catch(err => console.log(err));

// export { mongooseConnection }