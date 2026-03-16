import RefreshToken from "../models/refreshTokens.modules.js";



export const SessionRepo = {
    revokeSession: async (userId, tokenId) => {
        try {
            const session = await RefreshToken.findOne({
                userId,
                tokenId,
                revoked: false
            });

            

            if (!session) {
                return null
            }

            session.revoked = true;
            await session.save();
            return session;

        } catch (error) {
            console.error("Error in revokeSession:", error);
            throw error;
        }
    }
}