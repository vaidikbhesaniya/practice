const express = require('express');
const { registerUser, getUsers } = require('../controllers/userController');
const { insertUser } = require('../controllers/userController');
const router = express.Router();
const { queryUsers } = require('../controllers/userController');

const { updateUser } = require('../controllers/userController');
const { removeUser } = require('../controllers/userController');


router.delete('/remove/:id', removeUser);

router.put('/update/:id', updateUser);
router.get('/query', queryUsers);
router.post('/insert', insertUser);
router.post('/register', registerUser);
router.get('/', getUsers);

module.exports = router;