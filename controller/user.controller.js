import {
    successResponse,
    serverErrorResponse,
    badRequestResponse,
    notFoundResponse,
    handle304
} from '../utils/response.js';
import {joi_signup,joi_login} from '../joi/user/index.js';
import { User } from '../models/user.model.js';
import bcrypt from "bcrypt";
import { findUserByEmail } from '../repository/user.repository.js';

const login = async (req, res) => {
    try {
        const { error } = joi_login.validate(req.body);
        if (error) {
            return badRequestResponse(res, 'Invalid data entered');
        }

        let [err, user] = await findUserByEmail(req.body.email);
        if (err) {
            if (err.code == 400) {
                return badRequestResponse(res, "User not found");
            }
                
            if (err.code == 500) {
                return serverErrorResponse(res, "Internal server error.");
            }
        }

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return badRequestResponse(res, 'Invalid Email or Password');
        }

        const token = user.generateAuthToken();
        user.isActivated = true;
        user = await user.save();
        res.setHeader('x-auth-token', token);

        return successResponse(res, null, "Successfully logged in");

    } catch (err) {
        console.log(err);
        return serverErrorResponse(res, "Something went wrong");
    }
}

const signup = async (req, res) => {
    //search for user in DB
    const [err, user] = await findUserByEmail(req.body.email);
    
    if (err) {
        if (err.code == 404) {
            try {
                const {error} = joi_signup.validate(req.body);

                if (error) {
                    return badRequestResponse(res,"Invalid data entered");
                }
                let user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
                const salt = await bcrypt.genSalt(12);
                user.password = await bcrypt.hash(user.password, salt);
                user = await user.save();
                return successResponse(res,user,"User saved in database");
            } catch (err) {//If there is some error while creating the user do this 
                console.log(err);
                return serverErrorResponse(res,"Internal server error");
            }
        } else {//If error code is other than 404
            return serverErrorResponse(res,"Internal Server Error: unable to generate OTP");
        }
    
    } else {//If no error => user exist with the given data
        return badRequestResponse(res,"User already registered");
    }
        
    
}

export {signup,login };