// user.js
class User {
    constructor(firstname, lastname, email, password, loggedIn) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
    }

    
    getUserInfo() {
        return `Name: ${this.firstname} ${this.lastname}, Email: ${this.email}`;
    }

    changePassword(newPassword) {
        this.password = newPassword;
    }
}

export default User;
