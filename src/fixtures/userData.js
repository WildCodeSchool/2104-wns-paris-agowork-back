// command to initialize users in database
// node -e 'require(\"./src/Fixtures/userData.js\").createUser()'
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { ID } = require("type-graphql");
require("dotenv").config();

module.exports.createUser = async function () {
  try {
    const dbLink = process.env.DB_LINK;
    const dbUrl = 'mongodb://' + dbLink + ':27017/agowork';
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(dbUrl, options);

    const modelUser = mongoose.model('user', new mongoose.Schema({
      firstname: String,
      lastname: String,
      email: {
        type: String,
        unique: true,
      },
      town: String,
      picture: String,
      role: String,
      password: String,
      campus: String,
      mood: String,
    }))

    const password = "password";
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const pictures = ["https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"];
    const cities = ["Paris", "Londres", "Madrid", "Moscou", "New York", "Long Beach", "Los Angeles", "Marseille", "Nice", "Grenoble", "Brest"];
    const campus = ["61bb16172591960024a65c37", "61b87be966e6b5001aefd6c6", "61b86357ae43b1001a4a6174", "61b3e1a961959c00195f4b7e"];
    const moods = ["61bb2c160fd07b0019ecf2db", "61ba71c4ba5150001ae8621c", "61ba24253b74a6001ac83262", "61bb36ee3c1830001aae2171"]

    if (modelUser.count() !== 0) {
      await modelUser.deleteMany();
      console.log("fixtures: users delete()");
    }

    for (let i = 0; i < 50; i++) {
      let firstname;
      let lastname;
      let email;
      let role;
      firstname = "firstname" + [i];
      lastname = "lastname" + [i];
      email = "email" + [i] + "@gmail.com";
      const citiesRandom = Math.floor(Math.random() * cities.length);
      const picturesRandom = Math.floor(Math.random() * pictures.length);
      const campusRandom = Math.floor(Math.random() * campus.length);
      const moodRandom = Math.floor(Math.random() * moods.length);

      if (i >= 0 && i < 5) {
        role = 'SUPERADMIN';
      } else if (i >= 5 && i < 10) {
        role = 'ADMIN';
      } else if (i >= 10 && i < 15) {
        role = 'TEACHER';
      } else if (i >= 15 && i < 50) {
        role = 'STUDENT';
      }

      const body = {
        firstname: firstname,
        lastname: lastname,
        town: cities[citiesRandom],
        campus: campus[campusRandom],
        email: email,
        picture: pictures[picturesRandom],
        role: role,
        mood: moods[moodRandom],
        password: hashedPassword,
      };
      const user = new modelUser(body);
      await user.save();
    }
    console.log("fixtures: users saved()");
  } catch (err) {
    console.log(err);
  }
}
