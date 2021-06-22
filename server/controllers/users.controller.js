const { userService, authService, emailService } = require('../services')
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const usersController = {
    async profile(req, res, next) {
        try {
            const user = await userService.findUserById(req.user._id)
            if (!user) {
                throw ApiError(httpStatus.NOT_FOUND, 'user not found');
            }

            res.json(res.locals.permission.filter(user._doc));
        } catch (err) {
            next(err);
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req)

            res.json(res.locals.permission.filter(user._doc)); // res.locals.permission.filter(user._doc) filters the response based on the roles 

        } catch (err) {
            next(err);
        }
    },
    async updateUserEmail(req, res, next) {
        try {
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            await emailService.registerEmail(user.email, user);

            res.cookie('x-access-token', token)
                .send({
                    user,
                    token
                })

        } catch (err) {
            next(err);
        }
    },
    async verifyAccount(req, res, next) {
        try {
            const token = await userService.validateToken(req.query.validation);
            const user = await userService.findUserById(token.sub);

            if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
            if (user.verified) throw new ApiError(httpStatus.BAD_REQUEST, 'Already verified')

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                user
            })
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = usersController;