import {User} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {generateTokenAndSetCookie} from '../utils/generateToken.js';


//signup function
export async function signup(req,res) {
   try{
    const {email,username,password} = req.body;

    if(!email || !password || !username){
        return res.status(400).json({success:false,message:"All fields are required!!"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:"Invaild Email!!"});
    }

    if(password.length < 6){
        return res.status(400).json({success:false,message:"Password should be greter than 6 characters"});
    }

    const existingUserByEmail = await User.findOne({email:email});

    if(existingUserByEmail){
        return res.status(400).json({success:false,message:"Email already in use"});
    }

    const existingUSerByUsername = await User.findOne({username:username});

    if(existingUSerByUsername){
        res.status(400).json({success:false,message:"Username already in use!!"});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);

    const PROFILE_PIC = ['/avatar1.png','/avatar2.png','/avatar3.png'];

    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

    const newUser = new User({
        email,
        username,
        password:hashedPassword,
        image
    });

    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();
    res.status(201).json({success:true,user:{
        ...newUser._doc,
        password: "",
    }});

   }catch(e){ 
       console.log(`Error in signup controller ${e.message}`);
       res.status(500).json({success:false,message:"Internal server error"});
       
    }
};


//login function
export async function login(req,res){
   try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).json({success:false,message:"Email And Password Both Required!"});
    }

    const user = await User.findOne({email:email});

    if(!user){
       return  res.status(404).json({success:false,message:"Invaild Cradintials!"});
    }

    const isPasswordCorrect = await bcryptjs.compare(password,user.password);

    if(!isPasswordCorrect){
       return res.status(404).json({success:false,message:"Incorrect Password!"});
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({success:true,user:{
        ...user._doc,
        password:""
    }});


   }catch(e){
    console.log("Internal server error",e.message);
    res.status(500).json({success:false,message:"Internal server error"});
    
   }
};


//logout function
export async function logout(req,res){
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"Loggedout successfully"});
    }catch(e){
        console.log("Error in log out controller",e.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
};



export async function authCheck(req,res){
    try{
        res.status(200).json({success:true,user:req.user});
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}