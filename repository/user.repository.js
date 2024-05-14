import { User } from '../models/user.model.js';

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            let errObj = {
                code: 404,
                message:"User not found"
            }
            return [errObj,null];
        } else {
            return [null,user];
        }
    }
    catch (err) {
        console.log(err);
        let errObj = {
            code: 500,
            message: "Internal server error"
        };
        return [errObj, null]; 
    }
}

export {
    findUserByEmail
}