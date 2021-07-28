const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
import { UserModel } from "../Models/UserModel/userSchema";

const config = {
    secret: "secret" //process.env.SECRET
}

const encryptPassword = (password: any) => new Promise((resolve, reject) => {
	return bcrypt.hash(password, 12);
})

const comparePassword = (password: any, hash: any) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compare(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

const getToken = (payload: any) => {
    const token = jwt.sign(payload.toJSON(), config.secret, {
        expiresIn: 604800, // 1 Week
    })
    return token
}

const setToken = (payload: any) => {
  const token = jwt.sign(payload, config.secret, {
      expiresIn: 604800, // 1 Week
  })
  return token
}

const getPayload = (token: any) => {
    try {
        const payload = jwt.verify(token, config.secret);
        return { loggedIn: true, payload };
    } catch (err) {
        // Add Err Message
        return { loggedIn: false }
    }
}

const getUser = async (authorization: any) => {
    const bearerLength = "Bearer ".length;
    if (authorization && authorization.length > bearerLength) {
      const token = authorization.slice(bearerLength);
      const { ok, result } = await new Promise(resolve =>
        jwt.verify(token, config.secret, (err: any, result: any) => {
          if (err) {
            resolve({
              ok: false,
              result: err
            });
          } else {
            resolve({
              ok: true,
              result
            });
          }
        })
      );
      
      if (ok) {
        const user = await UserModel.findOne({ _id: result._id });
        return user;
      } else {
        console.error(result);
        return null;
      }
    }
    
    return null;
  };


module.exports = {
    getToken,
    setToken,
    getPayload,
    encryptPassword,
    comparePassword
}