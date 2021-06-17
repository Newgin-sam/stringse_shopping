const { User } = require('../models/user');


const findUserByEmail = async (email) => {
    console.log("enterred!!!")
    return await User.findOne({ email: email });
}


module.exports = {
    findUserByEmail
}