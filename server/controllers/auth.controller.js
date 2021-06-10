const { authService } = require('../services');

const authController = {
    async hello(res) {
        try {
            const userHello = await authService.hello();
            authService.hello().then(data => console.log(data))
            // console.log(userHello);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = authController;