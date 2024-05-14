import joi from "joi";


export default joi.object().keys({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required()
    
});