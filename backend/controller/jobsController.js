const Job =  require('../Models/jobs')
const asynchandler = require('express-async-handler')

const job = asynchandler(async (req, res) => {
    const { user , title, description,salary 
        , company, email,job_category,job_type,
        job_experience,job_vacancy,job_deadline} = req.body;

        // console.log("this job", req.body);
const newjob = await Job.create({
    user , title, description,salary 
        , company, email,job_category,job_type,
        job_experience,job_vacancy,job_deadline
})
// console.log("this job", newjob);
if(newjob){
    res.status(201).json({
      message:"Job Added SucessFully yahooo...",
      data: newjob, 
    })
}else{
        res.status(400)
        throw new Error("error  Occured.. !");
}
});


module.exports =  job  ;