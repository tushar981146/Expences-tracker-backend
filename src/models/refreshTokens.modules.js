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
    }

}, {
    timestamps: true,
});


const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;