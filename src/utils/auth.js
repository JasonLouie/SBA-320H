export function validateCredentials(username, password) {
    const users = getAllUsers();
    const user = users.find(u => u.username === username.toLowerCase() && u.password === password);
    if (!user) {
        return {username: ["Username or password incorrect."]};
    }
    return user;
}

function checkUnique(username, email) {
    const errors = {};
    const users = getAllUsers();
    const usernameExists = users.find(u => u.username === username);
    const emailExists = users.find(u => u.email === email);
    
    if (usernameExists) errors.username = "Username already taken.";
    if (emailExists) errors.email = "Email already taken.";
    
    return errors;
}

export function registerUser(user) {
    // Check if username and email are unique
    const uniqueErrors = checkUnique(user.username, user.email);
    if (Object.keys(uniqueErrors).length > 0) {
        return uniqueErrors;
    }

    const users = getAllUsers();
    const newUser = {id: users[users.length-1]?.id + 1 || 1, ...user, favorites: {}};
    users.push(newUser);
    updateUsers(users); // Save new user to users in localStorage
    return newUser;
}

export function updateUser(user) {
    const users = getAllUsers();
    users.find((u, i) => {
        if (u.id === user.id){
            users[i] = user;
            return true;
        }
    });
    updateUsers(users); // Save changes to localStorage
}

function getAllUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users;
}

function updateUsers(newUsers) {
    localStorage.setItem("users", JSON.stringify(newUsers));
}