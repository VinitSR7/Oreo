const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');
// console.log('user router loaded!');
router.get('/', usersControllers.profile);

module.exports = router;