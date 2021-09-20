
class ScanInvoiceController {
    static getTotal(req, res, next) {
        const totalInvoice = req.totalInvoice

        res.status(200).json({ totalInvoice })
    }
}

module.exports = ScanInvoiceController