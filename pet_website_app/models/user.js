
const mongoose = require('mongoose');

// Schema with user collection fields in MongoDB
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String, 
    state: String,
    country: String,
    userName: String,
    password: String
});

//user class code 
class UserClass {
    constructor(firstName, lastName, email, address, state, country,userName,password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.state = state;
        this.country = country;
        this.userName = userName;
        this.password = password;
    }

    
    display() {}
    getUserName(){}
    getAddress(){}
    getEmail(){}
    getFirstName(){}
}

const User = mongoose.model('User', userSchema);

module.exports = { UserClass, User };