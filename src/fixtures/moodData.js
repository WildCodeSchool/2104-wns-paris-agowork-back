const mongoose = require("mongoose");
const { ID } = require("type-graphql");
require("dotenv").config();
ObjectId = require('mongodb').ObjectID;

module.exports.createMood = async function () {
    try {
        const dbLink = process.env.DB_LINK;
        const dbUrl = 'mongodb://' + dbLink + ':27017/agowork';
        const options = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(dbUrl, options);

        const modelMood = mongoose.model('mood', new mongoose.Schema({
            name: String,
            icon: String
        }))

        if (modelMood.count() !== 0) {
            await modelMood.deleteMany();
            console.log("fixtures: mood delete()");
        }

        const name = "Au top";
        const icon = "☀️";

        const body = {
            name: name,
            icon: icon
        }

        const mood = new modelMood(body);
        await mood.save();

        console.log("fixtures: mood saved()");
    } catch (err) {
        console.log(err);
    }
}
