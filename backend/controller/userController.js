const asynchandler = require('express-async-handler')
const User = require('../Models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = asynchandler(async (req, res) => {
    const {name , email , password } = req.body;

    const userExits = await User.findOne({email})

    if(userExits){
        res.status(400)                             
        throw new Error("User Already Exits");
    }

const user = await User.create({
    name,email,password,
})

if(user){
    res.status(201).json({
      message:"Register SucessFully yahooo...",
      data: user, 
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // password: user.password,
        // isAdmin: user.isAdmin,
        // token: generateToken(user._id)
    })

}else{
        res.status(400)
        throw new Error("User Occured.. !");
}
    // res.json
    // ({
    //     name,
    //     email,
    //     password,
    // });
});

//Login

const authUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

  if(user){
    if (await user.matchPassword(password)) {
      const token = generateToken(user._id);
      res.status(200).json({

        message:"Login SucessFully yahooo...",
        data: user,        
        token: token,
      });
       
    } else {
      res.status(401).json({
        message:"Invalid Email or Password",
      })
      // throw new Error("Invalid Email or Password");
    }
  }else{
    res.status(400).json({
      message: "User Is not Exists"
    })
  }
    
  });

//profile 

const GetUser = asynchandler(async (req, res) => {
 
  const user = await User.findById(req.params.id);

if(user){
    res.status(200).json({
      message:"User Found...",
      data: user,        
    });
     
}else{
  res.status(400).json({
    message: "User Is not Found"
  })
}
  
});

module.exports = { registerUser , authUser , GetUser}