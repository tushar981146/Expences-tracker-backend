import { generateAccessToken, generateRefreshToken } from '../config/utils.js';
import { AuthHandler, cloudinaryHandler } from '../service/auth.services.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js'




export const signup = asyncErrorHandler(async (req, res) => {


        const { user, accessToken, refreshToken } = await AuthHandler.signupService({ ...req.body, headers: req.headers, ip: req.ip });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token: accessToken
        });
})

export const login = asyncErrorHandler(async (req, res) => {
    // Logic for user signup

    

   
        const userObj = await AuthHandler.loginService({ ...req.body, headers: req.headers, ip: req.ip });

        


        res.cookie("refreshToken", userObj.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


            
            res.status(200).json({
                _id: userObj.user._id,
                fullName: userObj.user.fullName,
                email: userObj.user.email,
                profilePic: userObj.user.profilePic,
                token: userObj.accessToken
            });
        
   
})

export const logout = asyncErrorHandler((req, res) => {
    // Logic for user signup
    
        res.cookie("refreshToken", "", { maxAge: 0 })
        res.status(200).json({ message: 'User logged out successfully' });
    
})

export const updateProfile = asyncErrorHandler(async (req, res) => {


        const { profilePic } = req.body;
        const userId = req.user._id

        const updateUser = await AuthHandler.updateProfileService(profilePic, userId);
        
        res.status(200).json(updateUser);

    
})

export const generalupdate = asyncErrorHandler(async (req, res) => {


        const { email, fullName } = req.body;
        const userId = req.user._id;

        const updatedUser = await AuthHandler.generalupdateService(email, fullName, userId)

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    
})

export const passwordUpdate = asyncErrorHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

        const msg = await AuthHandler.passwordUpdateService(oldPassword, newPassword, userId);

        res.status(200).json({ message: msg });
    
})

export const refreshToken = asyncErrorHandler(async (req, res) => {

    const authHeader = req.headers.authorization;
    const refreshHeaders = req.headers.cookie;

    const refreshToken = (refreshHeaders && refreshHeaders.split('=')[1]) || (authHeader && authHeader.split(" ")[1]);


    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }


        const validationResponse =  await AuthHandler.refreshTokenValidationService(refreshToken, req);


        res.cookie("refreshToken", validationResponse.newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(validationResponse.status).json({
            token: validationResponse.accessToken,
            _id: validationResponse.userId,
            fullName: validationResponse.fullName,
            email: validationResponse.email,
            profilePic: validationResponse.profilePic
        });


})

