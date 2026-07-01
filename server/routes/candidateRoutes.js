const express                                      = require('express');
const router                                       = express.Router();
const { getAll, getById, create, update, remove }  = require('../controllers/candidateController');
const { verifyToken }                              = require('../middleware/auth');

router.get('/',    verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.post('/',   verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

module.exports = router;
