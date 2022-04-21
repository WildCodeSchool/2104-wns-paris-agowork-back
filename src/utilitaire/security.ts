const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret = `${process.env.SECRET_JWT}`;

export type Payload = {
	user?: string;
};
  
export const comparePassword = (password: any, hash: any) => new Promise(async (resolve, reject) => {
	try {
		const isMatch = await bcrypt.compareSync(password, hash)
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

export const getToken = (payload: any): string => {
    const token = jwt.sign(payload, secret, {
        expiresIn: 604800, // 1 Week
    })
    return token
}

export const verifyToken = (token: any): Payload => {
    const payload = jwt.verify(token, secret) as Payload;
    return payload;
}