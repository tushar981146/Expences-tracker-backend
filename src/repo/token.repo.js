import RefreshToken from "../models/refreshTokens.modules.js";



 const TokenRepo = {
    saveRefreshToken: async (userId, refreshTokenId, deviceInfo, ip) => {
        try {
            const newToken = new RefreshToken({
                userId,
                tokenId: refreshTokenId,
                deviceInfo,
                ip,
                revoked: false
            });
            await newToken.save();
        } catch (error) {
            throw error;
        }
    }
};

export default TokenRepo;