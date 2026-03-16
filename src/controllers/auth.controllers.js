import { generateAccessToken, generateRefreshToken } from '../config/utils.js';
import auth from '../repo/user.repo.js'
import { AuthHandler, cloudinaryHandler } from '../service/auth.services.js';
import bcrypt from 'bcryptjs';
import TokenRepo from '../repo/token.repo.js';

export const signup = async (req, res) => {

    try {


        const user = await AuthHandler.signupService(req.body);

        if (user === false) return res.status(400).json({ message: 'user already exists' });

        const accessToken = generateAccessToken(user._id, user.email, user.fullName, user.profilePic);
        const { refreshToken, tokenId } = generateRefreshToken(user._id);




        await TokenRepo.saveRefreshToken(user._id, tokenId, req.headers['user-agent'], req.ip);

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




    } catch (error) {
        console.error("Error in signup controller:", error);
    }
};

export const login = async (req, res) => {
    // Logic for user signup
    try {
        const userObj = await AuthHandler.loginService(req.body);

        if (userObj.status !== 200) {
            return res.status(userObj.status).json({ message: userObj.message });
        }

        else {
            res.status(200).json({
                _id: userObj.user._id,
                fullName: userObj.user.fullName,
                email: userObj.user.email,
                profilePic: userObj.user.profilePic,
                token: userObj.accessToken
            });
        }
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: 'Invalid creditionals' });
    }
};

export const logout = (req, res) => {
    // Logic for user signup
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfile = async (req, res) => {



    try {
        const { profilePic } = req.body;
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: 'Profile picture is required' });
        }

        const uploadResponse = await cloudinaryHandler.upload(profilePic);
        const updateUser = auth.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url })
        res.status(200).json(updateUser)

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "internal server Error" })
    }
};

export const generalupdate = async (req, res) => {


    try {
        const { email, fullName } = req.body;
        const userId = req.user._id;

        const updatedUser = auth.findByIdAndUpdate(
            userId,
            { email, fullName }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in generalupdate controller:", error);
        res.status(500).json({ message: "internal server Error" })
    }
};

export const passwordUpdate = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    try {
        const user = auth.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in passwordUpdate controller:", error);
        res.status(500).json({ message: "internal server Error" })
    }
};

export const refreshToken = async (req, res) => {
    
    const authHeader = req.headers.authorization;
    const refreshHeaders = req.headers.cookie;

    const refreshToken = (refreshHeaders && refreshHeaders.split('=')[1]) ||(authHeader && authHeader.split(" ")[1]);


    try {
        const validationResponse = await AuthHandler.refreshTokenValidationService(refreshToken, req);

        if (validationResponse.status !== 200) {
            return res.status(validationResponse.status).json({ message: validationResponse.message });
        }

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

    } catch (error) {
        console.error("Error in refreshToken controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }




};

