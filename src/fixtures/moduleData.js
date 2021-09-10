// command to initialize users in database
// node -e 'require(\"./src/Fixtures/userData.js\").createUser()'
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports.createModule = async function () {
  try {
    const dbUrl = `mongodb://mongodb:27017/agowork`;
    const options = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(dbUrl, options);

    const modelModule = mongoose.model('module', new mongoose.Schema({
      title: {
        type: String,
        unique: true,
      },
      content: String,

    //   course: {
    //     type: Array,
    //     unique: true
    //   }
    }))

    const comment = [
                        "JavaScript, often abbreviated as JS, is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.",
                        "React est une bibliothèque JavaScript permettant de construire des interfaces utilisateur. Elle combine rapidité d'exécution, simplicité de développement et scalabilité.",
                        "TypeScript is an open-source programming language. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.",
                        "React Native - Build native iOS, Android and Windows apps with JavaScript.",
                        "Découvre comment utiliser les class components en React",
                    ]

    if (modelModule.count() !== 0) {
      await modelModule.deleteMany();
      console.log("fixtures: modules delete()");
    }

    for (let i = 0; i < 8; i++) {
      let title;
      let content;
      title = "title" + [i];
      content = comment;
      const chance = Math.floor(Math.random() * content.length);

      const program = {
        title: title,
        content: content[chance],
      };
      const module = new modelModule(program);
      await module.save();
    }
    console.log("fixtures: modules saved()");
  } catch (err) {
    console.log(err);
  }
}
