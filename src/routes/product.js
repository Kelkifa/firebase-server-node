const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.put('/update', ProductController.update);
router.get('/adminGet', ProductController.adminGet);
router.get('/getDelete', ProductController.getDelete)
router.post('/add', ProductController.add);
router.patch('/restore', ProductController.restore);
router.delete('/delete', ProductController.forceDelete);
router.patch('/delete', ProductController.delete);
router.get('/', ProductController.index);

module.exports = router;