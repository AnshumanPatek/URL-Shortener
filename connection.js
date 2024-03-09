const mongoose = require("mongoose");

//connection
async function connectMongodb(url) {
    return mongoose.connect(url);
}

module.exports = { connectMongodb, };