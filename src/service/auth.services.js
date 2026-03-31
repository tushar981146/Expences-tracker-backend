import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';
import authdb from '../repo/user.repo.js';
import jwt from 'jsonwebtoken';
import TokenRepo from '../repo/token.repo.js';
import { generateAccessToken, generateRefreshToken } from '../config/utils.js';
import { SessionRepo } from '../repo/session.repo.js'
import CustomError from '../utils/customError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';





export const AuthHandler = {

    signupService: async (data) => {

        const user = await authdb.findUserByEmail(data.email);

        if (user) throw new CustomError("User already exist", 409);


        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = await authdb.createUser({
            email: data.email,
            fullName: data.fullName,
            password: hashedPassword
        });

        const accessToken = generateAccessToken(newUser._id, newUser.email, newUser.fullName, newUser.profilePic);
        const { refreshToken, tokenId } = generateRefreshToken(newUser._id);

        await TokenRepo.saveRefreshToken(newUser._id, tokenId, data.headers?.['user-agent'], data.ip);

        return { user: newUser, accessToken, refreshToken };
    },

    loginService: async (data) => {

        

        
        

        const user = await authdb.findUserByEmailWithPassword(data.email);

        if (!user) throw new CustomError('User does not exist', 400);


        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw new CustomError('Invalid credentials', 401);

        


        const accessToken =  generateAccessToken(user._id, user.email, user.fullName, user.profilePic);

        const { refreshToken, tokenId } = generateRefreshToken(user._id);


        await TokenRepo.saveRefreshToken(user._id, tokenId, data.headers?.['user-agent'], data.ip);


        return { user, accessToken, refreshToken };
    },

    updateProfileService: asyncErrorHandler(async (pic, id) => {

        const uploadResponse = await cloudinaryHandler.upload(profilePic);
        const updateUser = auth.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url })

        if (!updateUser) new CustomError("The user with the provided ID does not exist.", 404)

        return updateUser

    }),

    generalupdateService: asyncErrorHandler(async (email, fullName, userId) => {

        const updatedUser = auth.findByIdAndUpdate(
            userId,
            { email, fullName }
        );

        if (!updatedUser) new CustomError("User not found", 404);

        return updatedUser

    }),

    passwordUpdateService: asyncErrorHandler(async (oldPassword, newPassword, userId) => {
        const user = auth.findById(userId);

        if (!user) new CustomError("User not found", 404);

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordCorrect) new CustomError("Old password is incorrect", 400);


        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return "Password updated successfully"
    }),

    refreshTokenValidationService: async (refreshToken, req) => {



        let decoded;




        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);


        if (!decoded) throw new CustomError("Invalid Token", 401)





        const { userId, tokenId } = decoded;

        const user = await authdb.findById(userId);





        const session = await SessionRepo.revokeSession(userId, tokenId);

        if (session === null) throw new CustomError("Invalid or expired refresh token in session check", 403);





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
            profilePic: user.profilePic ? user.profilePic : ""
        }

    }

}


export const cloudinaryHandler = {

    upload: asyncErrorHandler(async (file) => await cloudinary.uploader.upload(file))
}