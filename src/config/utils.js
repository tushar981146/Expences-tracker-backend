import jwt from 'jsonwebtoken';
import { v4 as uuid } from "uuid";



export const generateAccessToken = (userId, email, fullName, profilePic) => {
    const token = jwt.sign({ userId, email, fullName, profilePic }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    });



    return token;
};

export const generateRefreshToken = (userId) => {

    try {
        const tokenId = uuid();
        
        const refreshToken = jwt.sign({ userId, tokenId: tokenId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d"
        });

        return { refreshToken, tokenId };
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw error;
    }
};



