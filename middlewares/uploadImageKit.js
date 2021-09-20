const FormData = require('form-data');
const imageKitAPI = require('../apis/imageKit');

async function uploadToImagekit(req, res, next) {
    try {
        console.log(req.file);
        const file = req.file.buffer.toString('base64')
        const fileName = req.file.originalname

        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', fileName)

        const { data: resImagekit } = await imageKitAPI({
            method: 'POST',
            url: '/upload',
            headers: {
                ...formData.getHeaders()
            },
            data: formData
        })

        req.invoiceUrl = resImagekit.url
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = uploadToImagekit