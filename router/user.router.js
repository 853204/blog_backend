const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {User}=require("../model/user.model")
const{blacklist}=require("../model/blacklisting.model")

const userRouter=express.Router()


userRouter.post("/signup", async (req, res) => {
    try{
        const {email,password,name}=req.body;
        const isUserpresent= await User.findOne({email});
        if(isUserpresent){
            return res.status(400).send({msg:"Already a user, please login "})

        }
        const hashedPassword=bcrypt.hashSync(password,8);
        const newUser= new User({ ...req.body,password: hashedPassword})
        await newUser.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        res.status(201).json({ token });
    }catch(err){
        res.status(500).send({msg:err.message})
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  
  
  
  
  userRouter.get("/logout", async (req, res) => {
  try {
  const token = req.headers.authorization.split(' ')[1];
  
  
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  const blacklistToken = new blacklist({ token });
  await blacklistToken.save();
  
  res.status(200).json({ message: 'Log out successfully' });
  } catch (error) {
  res.status(400).json({ message: error.message });
  }
  });

  module.exports={userRouter}