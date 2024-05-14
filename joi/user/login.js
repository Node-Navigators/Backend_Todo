import joi from "joi";

export default joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required()
    
});