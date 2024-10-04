module.exports = function() {
    var authUserDao = require('../dao/user_auth_dao.js')
    require('../utils/common.js')()
    require('dotenv').config()

    this.userAuthService = async (auth, callback) => {
        var response = {}
        try {
            var authDao = new authUserDao()
            var userInfo = await authDao.verifyUserDetails(auth)
            if (userInfo.error == 'true') {
                response.error = "true"
                response.msg = 'UNAUTHORIZED'
            } else {
                response.error = "false"
                response.msg = 'VALID'
                response.data = userInfo.result
            }
            callback(response)
        } catch (err) {
            err.error = "true"
            err.msg = message.OOPS_user_auth_service
            callback(err)
        }
    }
}