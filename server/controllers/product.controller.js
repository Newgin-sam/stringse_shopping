const { productService } = require("../services");


const productController = {
    async addProduct(req, res, next) {
        try {
            const product = await productService.addProduct(req.body);

            res.json(product);

        } catch (error) {
            next(error);
        }
    },
    async getProductById(req, res, next) {
        try {
            const _id = req.params.id;
            const product = await productService.getProductById(_id);

            res.json(product);

        } catch (error) {
            next(error);
        }
    },
    async updateProductById(req, res, next) {
        try {
            const _id = req.params.id;
            const product = await productService.updateProductById(_id, req.body);

            res.json(product);

        } catch (error) {
            next(error);
        }
    },
    async deleteProductById(req, res, next) {
        try {
            const _id = req.params.id;
            const product = await productService.deleteProductById(_id);

            res.json(product);

        } catch (error) {
            next(error);
        }
    },
    async allProduct(req, res, next) {
        try {
            const products = await productService.allProduct(req);

            res.json(products);
        } catch (error) {
            next(error);
        }
    },
    async paginateProducts(req, res, next) {
        try {
            const products = await productService.paginateProducts(req);

            res.json(products);
        } catch (error) {
            throw error;
        }
    },
    async picUpload(req, res, next) {
        try {
            const pic = await productService.picUpload(req)
            res.json(pic)
        } catch (error) {
            throw error;
        }

    }

}

module.exports = productController;