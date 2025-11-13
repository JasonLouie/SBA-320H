export function validateCredentials(username, password) {
    const users = getAllUsers();
    const user = users.find(u => u.username === username.toLowerCase() && u.password === password);
    if (!user) {
        return "Username or password incorrect.";
    }
    return user;
}

function validateRegistration(email, username) {
    const errors = {};
    const users = getAllUsers();
    const usernameExists = users.find(u => u.username === username);
    
    if (usernameExists) {
        errors.username = "Username already taken.";
    }

    const emailExists = users.find(u => u.email === email);
    if (emailExists) {
        errors.email = "Email already taken.";
    }
    return errors;
}

export function registerUser(user) {
    const errors = validateRegistration(user.email, user.username);
    console.log(errors);
    if (Object.keys(errors).length > 0) {
        console.log("Errors detected!");
        return {errors};
    }
    console.log("No errors detected! Adding user...");
    // Add user if there aren't any errors with uniqueness
    const users = getAllUsers();
    users.push(user);
    updateUsers(users); // Save new user
}

export function addFavorite(id, manga) {
    const users = getAllUsers();
    const user = users.find((u, i) => {
        if (u.id === id){
            users[i].favorites[manga.id] = manga;
        }
        return true;
    });
    updateUsers(users); // Save changes to localStorage
    return user;
}

export function removeFavorite(id, mangaId) {
    const users = getAllUsers();
    const user = users.find((u, i) => {
        if (u.id === id){
            delete users[i].favorites[mangaId];
        }
        return true;
    });
    updateUsers(users); // Save changes to localStorage
    return user;
}

function getAllUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    return users;
}

function updateUsers(newUsers) {
    localStorage.setItem("users", JSON.stringify(newUsers));
    console.log(localStorage);
}