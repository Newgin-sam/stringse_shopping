const { User } = require('../models/user');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
const userService = require('./user.service.js');


const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'sorry email taken');
        }

        const user = new User({
            email,
            password
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInWithEmailAndPassword = async (email, password) => {
    try {

        const user = await userService.findUserByEmail(email)
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'sorry BAD email')
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'sorry BAD password')
        }
        return user;
    } catch (e) {
        throw error;
    }
}

module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}