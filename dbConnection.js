const mongoose = require ('mongoose');

async function main() {
    await mongoose.connect(process.env.mongoUrl);
}

module.exports = main;