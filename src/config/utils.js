import jwt from 'jsonwebtoken';
import { v4 as uuid } from "uuid";
import asyncErrorHandler from '../utils/asyncErrorHandler.js';



export const generateAccessToken = (userId, email, fullName, profilePic) => {

    const payload = { userId, email, fullName };

    if (profilePic) payload.profilePic = profilePic;

    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"

    })
    return token;
};

export const generateRefreshToken = (userId) => {

    const tokenId = uuid();

    const refreshToken = jwt.sign({ userId, tokenId: tokenId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });

    return { refreshToken, tokenId };

};



