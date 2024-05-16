const express = require('express')
const  job  = require("../controller/jobsController")

const router = express.Router()

router.route('/addjob').post(job)
// router.post('/addjob', () => {
//     job
//   });



module.exports = router;