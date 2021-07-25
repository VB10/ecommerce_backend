const { Joi } = require('express-validation')


class LoginModel {

    static loginValidation = {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
        }),
    }

    static forgotValidation = {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
        }),
    }

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkModel() {
        if (this.email && this.password) {
            return true;
        } return false;
    }
}



module.exports = LoginModel;

