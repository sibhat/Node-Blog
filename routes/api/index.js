const express = require('express');
const router = express.Router();

const postRoute = require('./posts');
const userRoute = require('./user');
const tagRoute = require('./tags');
const {
    signIn,
    signUp,
    protect
} = require('../handlers')

router.use('/posts', postRoute)
router.use('/user', userRoute)
router.use('/tags', tagRoute)
router.post('/register', signUp)
router.post('/login', protect, signIn)

module.exports = router;