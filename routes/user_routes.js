module.exports = function(app, validator) {
    var userPath = '/admin'
    require('../utils/error.js')()
    var userController = require('../controllers/user_controller.js')
    const multer = require('multer')
    require('dotenv').config()

    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, '../../../../var/www/html/uploads', file.mimetype);
        },
        filename: function(req, file, callback) {
            var timestamp = (new Date).getTime().toString()
            var type = file.mimetype.split("/")
            var name = timestamp + '.' + type[1]
            if (type[0] == 'image') {
                callback(null, name);
            } else {
                callback(true, null);
            }
        }
    });
    var upload = multer({ storage: storage }).any();

    app.post(userPath + '/imageUpload', function(request, response) {
        upload(request, response, function(err, data) {
            var message = {}
            var data = {}
            if (err) {
                message.error = 'true'
                message.message = 'Error uploading file.'
                return response.send(message)
            } else {
                message.error = 'false'
                message.message = 'File is uploaded successfully!'
                data.imageURL = process.env.IMAGE_UPLOAD_URL + request.files[0].filename
                message.data = data
                return response.send(message)
            }
        });
    });

    app.post(userPath + '/login', app.cors, [
        validator.check('name').optional().isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Name'),
        validator.check('email').optional().isEmail().withMessage('INVALID: $[1], Email'),
        validator.check('password').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Password')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var userControllerObject = new userController()
            userControllerObject.loginUserController(request.body, function(message) {
                return response.send(message)
            })
        }
    })

    app.get(userPath + '/patients', app.cors, app.auth, function(request, response) {
        var error = {}
        if (request.headers.role != 'admin') {
            error.error = "true"
            error.message = "UNAUTHORIZED"
            return response.status(401).send(error)
        } else {
            var lang = request.headers.lang
            var userControllerObject = new userController()
            userControllerObject.listPatientsuserController(request.body, function(message) {
                return response.send(message)
            })
        }
    })

    app.post(userPath + '/changePassword', app.cors, app.auth, [
        validator.check('oldpassword').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Old Password'),
        validator.check('newpassword').isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], New Password')
    ], function(request, response) {
        var lang = request.headers.lang
        var error = validator.validation(request)
        request.body.id = request.params.auth.id
        if (error.array().length) {
            this.requestHandler(error.array(), true, lang, function(message) {
                response.send(message)
            })
        } else {
            var userControllerObject = new userController()
            userControllerObject.changePassworduserController(request.body, function(message) {
                return response.send(message)
            })
        }
    })

}