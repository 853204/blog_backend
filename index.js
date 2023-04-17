let express=require("express")
let {connection}=require("./db")
const {userRouter}=require("./router/user.router")
const {blogRouter}=require("./router/blog.router")


require("dotenv").config()


let app=express()

app.use(express.json())

app.use("/user",userRouter)

app.use("/blog",blogRouter)

app.get("/",(req,res)=>{
    res.send("just checking")
})







app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log("Server is running at port 8080")
})


