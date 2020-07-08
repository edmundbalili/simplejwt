const { Router } = require('express');

const router = Router();
const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/logout', userController.logout);
router.get('/verify', jwtController.verify);

// Test transaction for Bearer token check using middleware isAuth
router.post('/create', jwtController.isAuth, userController.create);

module.exports = router;
