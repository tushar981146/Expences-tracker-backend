import { generateToken } from '../libs/utils.js';
import User from '../models/user.modules.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../libs/cloudinary.js';


export const signup = async (req, res) => {


    const { fullName, email, password } = req.body;
    try {



        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All feilds are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'password must more than 6 characters' });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'user already exists' });

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

        if (newUser) {


            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token: res.cookie.jwt
            })
        }
        else {
            res.status(400).json({ message: 'invalid user data' })
        }

    } catch (error) {
        console.error("Error in signup controller:", error);
    }
};

export const login = async (req, res) => {
    // Logic for user signup

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
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

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

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

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email, fullName },
            { new: true } // return updated document
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
        const user = await User.findById(userId);
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
