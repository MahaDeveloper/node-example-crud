module.exports = function() {
    var mysqlExecute = require('../connection.js')

    this.getAdminLoginDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id,name,email,password,role from Admin where name =? OR email = ?"
                var queryRequest = [data.name, data.email]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    this.getAuthDetailsDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id,name,email,password,role from Admin where email = ?"
                var queryRequest = [data.email]
                var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    this.listPatientsAdminDao = (data) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT name , profilePic , email , countryCode as cc, mobileNumber , os ,gender, date_format(updatedAt,\'%Y-%m-%d %h:%i:%s \') AS lastTime , date_format(createdAt,\'%Y-%m-%d\') AS createdAt FROM patients"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    resolve(queryResponse)
                } else {
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }
}