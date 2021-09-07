// command to initialize users in database
// node -e 'require(\"./src/Fixtures/userData.js\").createUser()'
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();


module.exports.createUser = async function () {
  try {
    const modelUser = mongoose.model('user', new mongoose.Schema({
      firstname: {
        type: String,
        unique: true,
      },
      lastname: {
        type: String,
        unique: true,
      },
      email: {
        type: String,
        unique: true,
      },
      town: String,
      picture: String,
      role: String,
      password: String,
    }))
    
    const password = "password";
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const picture = "https://images.unsplash.com/photo-1627434880836-e94b1bdc2098?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
    const cities = ["Paris", "Londres", "Madrid", "Moscou", "New York", "Long Beach", "Los Angeles", "Marseille", "Nice", "Grenoble", "Brest"];

    if(modelUser.count() !== 0){
      await modelUser.deleteMany();
      console.log("fixtures: users delete()");
    } 
    for (let i = 0; i < 20; i++) {
      let firstname;
      let lastname;
      let email;
      let role;
      firstname = "firstname" + [i];
      lastname = "lastname" + [i];
      email = "email" + [i] + "@gmail.com";
      const random = Math.floor(Math.random() * cities.length);
      if (i == 0) {
        role = 'SUPERADMIN';
      } else if (i > 0 && i < 5) {
        role = 'ADMIN';
      } else if (i >= 5 && i < 10) {
        role = 'ADMIN';
      } else if (i >= 10 && i < 15) {
        role = 'TEACHER';
      } else if (i >= 15 && i < 20) {
        role = 'STUDENT';
      }
      const body = {
        firstname: firstname,
        lastname: lastname,
        town: cities[random],
        email: email,
        picture: picture,
        role: role,
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