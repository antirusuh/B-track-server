const verifyAPI = require('../apis/verify');

async function scanOCRVerify(req, res, next) {
    const file_url = req.invoiceUrl
    try {
        const { data: resVerify } = await verifyAPI({
            method: 'POST',
            url: '/documents',
            data: {
                file_url
            }
        })

        req.totalInvoice = Math.floor(resVerify.total)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = scanOCRVerify