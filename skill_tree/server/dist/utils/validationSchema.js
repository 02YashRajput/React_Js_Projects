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
export const updateMyCourse = {
    name: {
        notEmpty: {
            errorMessage: "Course name cannot be empty",
        },
        isString: {
            errorMessage: "Course name must be a string!",
        },
    },
    state: {
        notEmpty: {
            errorMessage: "Course state cannot be empty",
        },
        isString: {
            errorMessage: "Course state must be a string!",
        },
        isIn: {
            options: [["Not Started", "In Progress", "Completed", "Stopped"]],
            errorMessage: "Course state must be one of: Not Started, In Progress, Completed, Stopped",
        },
    },
};
