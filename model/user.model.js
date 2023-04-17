let mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    userId:String
    
})

const User=mongoose.model("user",userSchema)

module.exports={User}