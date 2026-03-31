import jwt from 'jsonwebtoken';
import User from '../models/user.modules.js';

export const protectRoute = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
 

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);


        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: 'Server error' });
        next(error);
    }
}

export const signupValidator = (req, res, next) => {




    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All feilds are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'password must more than 6 characters' });
    }


    next();
};
