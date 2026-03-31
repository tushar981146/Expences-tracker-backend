import User from '../models/user.modules.js';



const authdb = {
    findUserByEmail: async (email) => {
        try {
            const user = await User.findOne({ email }).select("-password");
            return user;
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw error;
        }
    },

    findUserByEmailWithPassword: async (email) => {
        try {
            const user = await User.findOne({ email })
            return user;
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw error;
        }
    },

    createUser: async (userData = {}) => {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    },

    findByIdAndUpdate: async (userID, userData = {}) => {
        try {
            const user = await User.findByIdAndUpdate(userID, userData, { new: true });
            return user;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    },

    findById: async (userID) => {
        try {
            const user = await User.findById(userID).select("-password");
            return user;
        } catch (error) {
            console.error("Error finding user by ID:", error);
            throw error;
        }
    }
}

export default authdb;