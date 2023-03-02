const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// MIDDLEWARE
const auth = require('../middleware/auth');

//set router to let user read their own profile
router.route('/profile')
.get(auth('readOwn','profile'),userController.profile)
.patch(auth('updateOwn','profile'),userController.updateProfile)

router.patch('/email',auth('updateOwn','profile'),userController.updateUserEmail)
router.get('/verify',userController.verifyAccout)

module.exports = router;