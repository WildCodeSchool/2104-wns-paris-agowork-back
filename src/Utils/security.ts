const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret = `${process.env.SECRET_JWT}`;

const comparePassword = (password: any, hash: any) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compareSync(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

const getToken = (payload: any) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: 604800, // 1 Week
    })
    return token
}


module.exports = {
    getToken,
    comparePassword
}