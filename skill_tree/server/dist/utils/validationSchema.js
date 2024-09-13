export const signUpSchema = {
    userName: {
        notEmpty: {
            errorMessage: "Email cannot be empty",
        },
        isString: {
            errorMessage: "Email must be a string!",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty",
        },
        isString: {
            errorMessage: "Email must be a string!",
        },
        isEmail: {
            errorMessage: "Email is not valid!",
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty",
        },
        isString: {
            errorMessage: "Password must be a string!",
        },
    },
};
export const loginSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty",
        },
        isString: {
            errorMessage: "Email must be a string!",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty",
        },
        isString: {
            errorMessage: "Password must be a string!",
        },
    },
};
