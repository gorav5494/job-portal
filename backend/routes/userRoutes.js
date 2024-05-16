const express = require('express')
const { registerUser, authUser, GetUser} = require("../controller/userController")

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/:id').get(GetUser)



module.exports = router;