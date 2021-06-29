const { check, validationResult } = require("express-validator");
const httpStatus = require("http-status");

const addProductValidator = [

    check('model')
        .trim().not().isEmpty().withMessage('you need to really add a model').bail()
        .isLength({ min: 3 }).withMessage('Minimun 3 characters Required !').bail(),

    check('brand')
        .trim().not().isEmpty().withMessage('you need to add a brand'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("3243")
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }

];

module.exports = {
    addProductValidator
}