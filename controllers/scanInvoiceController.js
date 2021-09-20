
class ScanInvoiceController {
    static getTotal(req, res, next) {
        const totalInvoice = req.totalInvoice
        const invoiceUrl = req.invoiceUrl

        res.status(200).json({ totalInvoice, invoiceUrl })
    }
}

module.exports = ScanInvoiceController