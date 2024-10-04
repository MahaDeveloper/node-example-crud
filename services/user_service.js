module.exports = function() {
    var userDao = require('../dao/user_dao.js')
    require('../utils/common.js')()

    this.loginUserService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var userDaoObject = new userDao()
            try {
                var getAdminLogin = await userDaoObject.getAdminLoginDao(userData)
                if (getAdminLogin.result.length > 0) {
                    if (getAdminLogin.error == 'true') {
                        response.error = "true"
                        response.message = "admin login failed"
                        resolve(response)
                    } else {
                        var passwordHash = this.spiltPasswordHash(getAdminLogin.result[0].password)
                        var hash = this.reGeneratePasswordHash(userData.password, passwordHash.salt)
                        if (hash === passwordHash.hash) {
                            var genToken = {}
                            genToken.id = getAdminLogin.result[0].id
                            genToken.name = getAdminLogin.result[0].name
                            genToken.email = getAdminLogin.result[0].email
                            response.error = "false"
                            response.message = "admin login success"
                            var token = await this.generateToken(genToken)
                            resp.token = Buffer.from(token).toString('base64')
                            resp.role = getAdminLogin.result[0].role
                            resp.id = getAdminLogin.result[0].id
                            response.result = resp
                            resolve(response)
                        } else {
                            response.error = "true"
                            response.message = "invalid password"
                            resolve(response)
                        }
                    }
                } else {
                    response.error = "true"
                    response.message = "invalid admin"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

    this.listPatientsAdminService = (userData) => {
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var userDaoObject = new userDao()
            try {
                var listUsersAdmin = await userDaoObject.listPatientsAdminDao(userData)
                if (listUsersAdmin.error == 'true') {
                    response.error = "true"
                    response.message = "fetch failed"
                    resolve(response)
                } else {
                    response.error = "false"
                    response.message = "listed patients"
                    resp.results = listUsersAdmin.result
                    response.result = resp
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }
}