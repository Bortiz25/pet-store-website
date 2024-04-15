const {User, UserClass} = require ('../models/user');


async function addUser(fstName, lstName, email, address, country, state,
    username, pw) {
    // Queries the database to see if there is already a product with the same name
    doesExist = await User.exists({userName: username});
    if(!doesExist){
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
        newUser.save();
    }
  }

  async function findUser(username, pw) {
    try {
    // Queries the database to see if there is already a product with the same name
    const ret = await User.find({userName: username, password: pw});
    const user = ret[0];
     //username exists and password is correct 
    if(ret.length != 0)  {
        return {userInfo: user, pw: true};
    }
     //username or pw is incorrect 
    else {
        return {userInfo: user, pw: false};
    }
    } catch (errr) {
        console.log("Error getting user from database", error);
    }
  }


module.exports = {addUser, findUser}; 