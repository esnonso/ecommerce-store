const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    firstname:{
        type: String,
        required:true
    },
    surname:{
        type: String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    productCatalog:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }] 
})



userSchema.pre("save", async function(next){
    try{
        if(this.password === process.env.SECRET_KEY){
            this.isAdmin = true;
        }
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword;
        return next()
    }catch(err) {
        return next(err)
    }
})


userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password); 
        return isMatch
    }catch(err){
        next(err)
    }
}

const User = mongoose.model("User", userSchema);


module.exports = User;