const {User, UserClass} = require ('../models/user');


async function addUser(fstName, lstName, email, address, country, state,
    username, pw) {
    // Queries the database to see if the username is already taken 
    doesExist = await User.exists({userName: username});
    if(!doesExist){
        // Our one admin user already exists in our 'users' collection in MongoDB
        let isAdmin = "false";
        const newUser = new User({
            firstName: fstName,
            lastName: lstName,
            email: email,
            address: address,
            state: state,
            country: country,
            userName: username,
            password: pw,
            isAdmin: isAdmin
        });
      
        await newUser.save();
        return true;
    } else {
        return false;
    }
  }

  async function findUser(username, pw) {
    try {
        // Queries the database to see if there is already a product with the same name
        const ret = await User.find({userName: username, password: pw});
        // mongoose.find() returns an array of documents 
        const user = ret[0];
        // username exists and password is correct 
        if(ret.length != 0)  {
            return {userInfo: user, access: true};
        }
        // username and/or pw is incorrect 
        else {
            return {userInfo: user, access: false};
        }
    } catch (error) {
        console.log("Error fetching user from 'users' collection: ", error);
    }
  }
// export an object containing the below functions 
module.exports = {addUser, findUser}; 