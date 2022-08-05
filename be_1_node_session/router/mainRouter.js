const express = require('express')
const router = express.Router()
const {registerUser, loginUser, sessionUser, changeUserName, getUser, getAllUsers, getSelectedUser, saveReview, getReviews, logOut} = require('../controller/mainController')
const RegistrationCheck = require('../modules/middleware/RegistrationCheck')


router.post('/registration', RegistrationCheck, registerUser)
router.post('/login', loginUser)
router.get('/user', sessionUser)
router.get('/getUser', getUser)
router.post('/changeUserName', changeUserName)
router.get('/allUsers', getAllUsers)
router.get('/users/:userName', getSelectedUser)
router.post('/saveReview', saveReview)
router.get('/reviews/:receiver', getReviews)
router.get('/logout', logOut)


module.exports = router