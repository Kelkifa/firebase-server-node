const express = require('express');
const GameController = require('../controllers/GameController');
const router = express.Router();


router.post('/getTest', GameController.getTest);
router.delete('/delete', GameController.delete);
router.get('/adminGet', GameController.adminGet);
router.get('/', GameController.index);
router.post('/', GameController.addMany);

module.exports = router;