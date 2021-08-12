const { transactionService } = require('../services')
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const transactionController = {
    async addTransaction(req, res, next) {
        try {
            const data = await transactionService.addTransaction(req);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = transactionController;