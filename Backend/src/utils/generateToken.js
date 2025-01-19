import { User } from "../modules/user.model.js"

export const createTokenforUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        const token = await user.generateToken();
        
        user.token = token;
        await user.save({validateBeforeSave:false});
        return token;
    } catch (error) {
        console.log("Error in genterating token for user ", error);
    }
} 