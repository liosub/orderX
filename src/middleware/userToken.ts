import jwt from "jsonwebtoken";
import { ProfileInput } from "../db/models/Profile";
require('dotenv').config();

const ACCESS_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

const generateTokens = async (user:ProfileInput) => {
    try {
        const payload = { _id: user.profile_id, businessName: user.businessName };
        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "2d" }
        );

        return Promise.resolve({ accessToken });
    } catch (err) {
        return Promise.reject(err);
    }
};


export default generateTokens;

