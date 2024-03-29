const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const userSchema = new mongoose.Schema({

    name :{
        type : String,
        required :[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name cannot be less than 4 characters"]
    },
    email :{
        type : String,
        required :[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Enter valid email"]
    },
    password :{
        type : String,
        required :[true,"Please enter your Password"],
        select:false,
        minLength:[8,"Password cannot be less than 8 characters"]
    },
    avatar:{
        public_id :{
            type:String,
            required:true

        },
        url: {
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){

if(!this.isModified("password"))
{
    next();
}
this.password= await bcrypt.hash(this.password,10);

});

//JWT Token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}; 

//Comparing Password

userSchema.methods.comparePassword=async function(enteredPassword)
{
    const value =await bcrypt.compare(enteredPassword,this.password);
    return value;
}

//Generating password Reset token
userSchema.methods.getResetPasswordToken = function()
{
//Generating Token
const resetToken=crypto.randomBytes(20).toString("hex");

//Hashing and adding resetPasswordToken to UserSchema
this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
this.resetPasswordExpire=Date.now() +15*60*1000;
return resetToken;
}

module.exports=mongoose.model("User",userSchema);