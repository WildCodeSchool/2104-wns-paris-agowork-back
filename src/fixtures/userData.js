// node -e 'require(\"./src/fixtures/userData.js\").createUser()'
const bcrypt = require("bcryptjs");
const { connect } = require("mongoose");
require("dotenv").config();
// const { getToken } = require("../Utils/security");




module.exports.createUser = async function() {

    const getToken = (payload) => {
        const token = jwt.sign(payload, secret, {
            expiresIn: 604800, // 1 Week
        })
        return token
    }
    
    const user = connect.Schema({
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
      token: String,
    });
    connect.model("User", user);


    
    const dbUrl = `mongodb://mongodb:27017/agowork`;
    const options = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        autoIndex: true
      }; 

      try {
        await connect(dbUrl, options);
        const password = "password";
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const picture = "https://images.unsplash.com/photo-1627434880836-e94b1bdc2098?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";
    const cities = ["Paris", "Londres", "Madrid", "Moscou", "New York", "Long Beach", "Los Angeles", "Marseille", "Nice", "Grenoble", "Brest"];
    for(let i=0; i<20; i++){
        let firstname;
        let lastname;
        let email;
        let role;
        firstname = "firstname"+[i];
        lastname = "lastname"+[i];
        email = "email"+[i];
        const payload = { userEmail: email, userRole: role };
        const token = getToken(payload);
        const random = Math.floor(Math.random() * cities.length);
        if(i==0){
            role = 'SUPERADMIN';
        } else if(i>0 && i<5) { 
            role = 'ADMIN';
        } else if(i>=5 && i<10) {
            role = 'ADMIN';
        } else if(i>=10 && i<15) {
            role = 'TEACHER';
        } else if(i>=15 && i<20) {
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
            token: token,
        };
        const user = new User(body);
        await user.save();
    }

      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Error during Database Connection : ${err}`);
      }

// async function createUser(){
    

  }

