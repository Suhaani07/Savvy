const User=require("../Model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cookieParser = require("cookie-parser");
const sendEmail = require("../utils/sendEmail");
const { reset } = require("nodemon");
const crypto = require("crypto");


//Register a User
exports.registerUser= catchAsyncErrors(async (req,res,next)=>{

    const {name,email,password} = req.body;
    const user=await User.create(
        {
            name,
            email,
            password,
            avatar:{
                public_id:"Sample public id",
                url:"profileimageURL"
            }
        }
    );

    sendToken(user,200,res);
});

//Login 

exports.loginUser= catchAsyncErrors(async (req,res,next)=>{

    const {email,password} = req.body;
   
    //Checking if entered both fields

    if(!email||!password)
    {
        return next(new ErrorHandler("Please enter email and password",400));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const PasswordisMatched= await user.comparePassword(password);
    
    if(!PasswordisMatched)
    {
        
        return next(new ErrorHandler("Invalid email or password",401));
    }
    //Matched

    sendToken(user,200,res);
    

});

//Logout User
exports.logout= catchAsyncErrors(async (req,res,next)=>
{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });


    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
});

//Forgot password
exports.forgotPassword =catchAsyncErrors(async(req,res,next)=>
{
    const user = await User.findOne({email:req.body.email});
    if(!user)
    {
        return next(new ErrorHandler("User not found",404));
    }


    //Get Reset Token via mail

    const resetToken= user.getResetPasswordToken();
    await user.save({validateBeforeSave : false});

    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message=`Your reset password token is : 
                    ${resetPasswordUrl}
                    
                    If not requested by you, please ignore.`


    try {
        await sendEmail({
            email : user.email,
            subject : `Ecommerce Website Password Reset`,
            message,
        }
        );
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        });
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave : false});
        return next(new ErrorHandler(error.message,500));
    }

});

//Resetting Password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

    //creating reset token hash 
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user)
    {
        return next(new ErrorHandler("Reset Password link is invalid or has expired",400));
    }
    if(req.body.password!==req.body.confirmpassword)
    {
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();

    //Logging in user 
    sendToken(user,200,res);
});

//Get user details

exports.getuserdetails=catchAsyncErrors(async (req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success : true,
        user
    })

});

//Change password

exports.changepassword=catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    
    const PasswordisMatched= await user.comparePassword(req.body.oldpassword);
    
    if(!PasswordisMatched)
    {
        
        return next(new ErrorHandler("Incorrect old password",400));
    }
    if(req.body.newpassword!==req.body.confirmpassword)
    {
        
        return next(new ErrorHandler("Password does not match",400));
    }

    if(req.body.newpassword===req.body.oldpassword)
    {
        
        return next(new ErrorHandler("Password cannot be the same",400));
    }

    //Matched
    user.password=req.body.newpassword;
    await user.save();
    sendToken(user,200,res);

});

//Update User Profile Info

exports.updateUserDetails=catchAsyncErrors(async (req,res,next)=>{
    const user1= await User.findById(req.params.id);
    if(!user1)
    {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    const newUserDetails = {
        name:req.body.name,
        email:req.body.email,
    }
    //Will add avatar later
    const user= await User.findByIdAndUpdate(req.params.id,newUserDetails,{
        new:true,
        runValidators:true,
        useFindandModify:false,
    });
    res.status(200).json({
        success : true,
        message:`Successfully updated details`
    })

});

//Find all users(admin)

exports.getAllUsers=catchAsyncErrors(async (req,res,next)=>{

    const users= await User.find();
    res.status(200).json({
        success : true,
        users,
    })

});

//Find single user(admin)

exports.findUser=catchAsyncErrors(async (req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success : true,
        user
    })

});

//Update User Profile Info --Admin

exports.updateUser=catchAsyncErrors(async (req,res,next)=>{
    const newUserDetails = {
        name:req.body.name,
        email:req.body.email,
        role : req.body.role,
    }
    const user= await User.findByIdAndUpdate(req.params.id,newUserDetails,{
        new:true,
        runValidators:true,
        useFindandModify:false,
    });
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success : true,
        message:`Successfully updated details`
    })

});

//Delete User Profile Info --Admin

exports.deleteUser=catchAsyncErrors(async (req,res,next)=>{
    
    const user= await User.findById(req.params.id);
    //Will remove avatar later

    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400));
    }

    await user.remove();

    res.status(200).json({
        success : true,
        message:`Successfully deleted user`
    })

});