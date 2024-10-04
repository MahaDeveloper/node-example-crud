module.exports = function(app, validator) {
    require('dotenv').config()
    const multer = require('multer')
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './uploads', file.mimetype);
        },
        filename: function(req, file, callback) {
            var timestamp = (new Date).getTime().toString()
            console.log("file", file)
            var type = file.mimetype.split("/")
            if (type[0] == 'image') {
                callback(null, timestamp + '.' + type[1]);
            } else {
                callback(true, null);
            }
        }
    });
    var upload = multer({ storage: storage }).any();

    app.post('/imageUpload', function(request, response) {
        upload(request, response, function(err, data) {
            var message = {}
            var data = {}
            if (err) {
                console.log("err", err)
                message.error = 'true'
                message.message = 'Error uploading file.'
                return response.send(message)
            } else {
                console.log("process.env.IMAGE_PATH", process.env.IMAGE_UPLOAD_URL)
                message.error = 'false'
                message.message = 'File is uploaded successfully!'
                data.imageURL = process.env.IMAGE_UPLOAD_URL + '/' + request.files[0].path
                message.data = data
                return response.send(message)
            }
        });
    });
}