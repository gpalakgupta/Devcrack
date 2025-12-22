const mongoose = require('mongoose');

async function main(){
    mongoose.connect(process.env.MONGO_URL)
}

module.exports = main;