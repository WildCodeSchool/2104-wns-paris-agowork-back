const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

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

const getPayload = (token: any) => {
    try {
        const payload = jwt.verify(token, config.secret);
        return { loggedIn: true, payload };
    } catch (err) {
        // Add Err Message
        return { loggedIn: false }
    }
}

module.exports = {
    getToken,
    getPayload,
    encryptPassword,
    comparePassword
}