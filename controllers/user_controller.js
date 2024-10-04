module.exports = function() {
    var userService = require('../services/user_service.js')
    require('../utils/common.js')()

    this.loginUserController = async (req, callback) => {
        var response = {}
        var userServiceObject = new userService()
        var loginUserService = await userServiceObject.loginUserService(req)
        if (loginUserService.error == "true") {
            response.error = "true"
            response.message = loginUserService.message
        } else {
            response.error = "false"
            response.message = loginUserService.message
            response.data = loginUserService.result
        }
        callback(response)
    }
}