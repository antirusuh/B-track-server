const router = require('express').Router();
const multer = require('multer');

const ScanInvoiceController = require('../controllers/scanInvoiceController');
const uploadToImagekit = require('../middlewares/uploadImageKit');
const scanOCRVerify = require('../middlewares/scanOCRVerify');

const upload = multer()

router.post('/', upload.single('invoice-file'), uploadToImagekit, scanOCRVerify, ScanInvoiceController.getTotal)

module.exports = router
