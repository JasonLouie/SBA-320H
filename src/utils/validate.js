function validate(validations, formData, confirmPassword=null) {
    const validationErrors = {};

    for (const field in validations) {
        const fieldName = field[0].toUpperCase() + field.slice(1);
        const rules = validations[field];
        const value = formData[field];
        const errors = [];
        
        if (rules.required && !value) {
            errors.push(`${fieldName} is required.`);
        }

        // Handle multiple regex tests
        if (value && rules.regexes) {
            rules.regexes.forEach(r => {
                if (value && r.regex && !r.regex.test(value)) {
                    errors.push(r.message);
                }
            });
        } else if (value && rules.regex && !rules.regex.test(value)) { // Handle a singular regex test
            errors.push(rules.message);
        }

        // Handle minLength tests
        if (value && rules.minLength && value.length < rules.minLength) {
            errors.push(`${fieldName} must be at least ${rules.minLength} characters.`)
        }

        if (errors.length > 0) {
            validationErrors[field] = errors;
        }
    }

    if (confirmPassword !== null && formData.password !== undefined && confirmPassword !== formData.password) {
        validationErrors.password ? validationErrors.password.push("Both passwords must match.") : validationErrors.password = ["Both passwords must match."];
    }

    return validationErrors;
}

const nameRules = {
    regex: !/^[a-zA-Z0-9_.\s]+$/,
    message: "Name can only contain letters, numbers, underscores, periods, and whitespaces.",
    required: true
};

const usernameRules = {
    regex: !/^[a-zA-Z0-9_.]+$/,
    message: "Username can only contain letters, numbers, underscores, and periods.",
    required: true,
    minLength: 5
};

const emailRules = {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format.",
    required: true
};

const passwordRules = {
    regexes: [
        {
            regex: /[a-z]/,
            message: "Must contain at least one lowercase letter."
        },
        {
            regex: /[A-Z]/,
            message: "Must contain at least one uppercase letter."
        },
        {
            regex: /\d/,
            message: "Must contain at least one number."
        },
        {
            regex: /^\S+$/,
            message: "Password cannot contain whitespace."
        }
    ],
    minLength: 8,
    required: true
};

export function validateSignUp(user) {
    const validations = {
        name: nameRules,
        username: usernameRules,
        email: emailRules,
        password: passwordRules
    };
    const { name, username, email, password, confirmPassword } = user;
    return validate(validations, { name, username, email, password }, confirmPassword);
}

export function validateLogin(username, password) {
    const requiredErrors = {};
    if (!username || !password) {
        requiredErrors.username = ["Username and password are required."];
    } else if (!username) {
        requiredErrors.username = ["Username is required."];
    }

    if (Object.keys(requiredErrors).length > 0) {
        return requiredErrors;
    }

    const validations = {
        username: usernameRules,
        password: passwordRules
    };
    const validationErrors = validate(validations, {username, password});
    return Object.keys(validationErrors).length > 0 ? {username: ["Username or password incorrect."]} : {};
}