import mongoose from "mongoose";



const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
    },
    deviceInfo: {
        type: String
    },
    ip: {
        type: String
    },
    revoked: {
        type: Boolean,
        default: false,
    },
    expireAt: { 
        type: Date, 
        default: () => new Date(Date.now() + 7*24*60*60*1000), 
        index: { expires: 0 } 
    },

}, {
    timestamps: true,
});


const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;