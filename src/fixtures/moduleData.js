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

    const ModuleModel = mongoose.model('module', new mongoose.Schema({
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
                        "JavaScript, often abbreviated as JS, is a high-level, interpreted programming.",
                        "React est une bibliothèque JavaScript permettant de construire des interfaces.",
                        "TypeScript is an open-source programming language. It is a strict syntactical.",
                        "React Native - Build native iOS, Android and Windows apps with JavaScript.",
                        "Découvre comment utiliser les class components en React",
                    ]

    if (ModuleModel.count() !== 0) {
      await ModuleModel.deleteMany();
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
      const module = new ModuleModel(program);
      await module.save();
    }
    console.log("fixtures: modules saved()");
  } catch (err) {
    console.log(err);
  }
}
