import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';
import authdb from '../repo/user.repo.js';
import jwt from 'jsonwebtoken';
import TokenRepo from '../repo/token.repo.js';
import { generateAccessToken, generateRefreshToken } from '../config/utils.js';
import { SessionRepo} from '../repo/session.repo.js'





export const AuthHandler = {

    signupService: async (data) => {

        const user = await authdb.findUserByEmail(data.email);

        if (user) return false;


        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await authdb.createUser({
            email: data.email,
            fullName: data.fullName,
            password: hashedPassword
        });

        return newUser;
    },

    loginService: async (data) => {

        const user = await authdb.findUserByEmail(data.email);
        if (!user) {
            return {
                status: 400,
                message: 'User does not exist'
            }
        };



        const accessToken = generateAccessToken(user._id);

        return {user, accessToken, status: 200, message: "Login successful"};
    },

    refreshTokenValidationService: async (refreshToken, req) => {


        let decoded;

        try {

            if (!refreshToken) {

                return {
                    status: 401,
                    message: "Unauthorized"
                }
            };

            
            try {
                decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            } catch (error) {
                console.error("Error verifying refresh token:", error);
                return {
                    status: 403,
                    message: "Invalid or expired refresh token"
                }
            }
            

            

            

            const { userId, tokenId } = decoded;

            const user = await authdb.findById(userId);

            


           

            const session = await SessionRepo.revokeSession(userId, tokenId);

            if (session === null) {
                return {
                    status: 403,
                    message: "Invalid or expired refresh token in session check"
                }
            }





            const newAccessToken = generateAccessToken(userId, user.email, user.fullName, user.profilePic);
            const { refreshToken: newRefreshToken, tokenId: newTokenId } = generateRefreshToken(userId);



            await TokenRepo.saveRefreshToken(
                userId,
                newTokenId,
                req.headers["user-agent"],
                req.ip
            );


            return {
                status: 200,
                accessToken: newAccessToken,
                newRefreshToken: newRefreshToken,
                userId,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            }
        } catch (error) {
            console.error("Error in refreshTokenValidationService:", error);
            return {
                status: 403,
                message: `this is authservice error: ${error.message}`
            };
        }
    }

}


export const cloudinaryHandler = {

    upload: async (file) => await cloudinary.uploader.upload(file)
}