const express=require("express")
const {Blog}=require("../model/blog.model")

const {blogRouter}=express.Router()


 blogRouter.post("/write", async (req, res) => {
    try {
      const { title, content } = req.body;
      const blog = new Blog({ title, content, author: req.user._id });
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  blogRouter.get("/getallblog",  async (req, res) => {
    try {
      const blogs = await Blog.find().populate('author', 'username');
      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  blogRouter.update("/update", async (req, res) => {
    try {
      const { title, content } = req.body;
      const blog = await Blog.findOneAndUpdate({ _id: req.params.id, author: req.user._id },{ title, content });
  
      if (!blog) {
        return res.status(400).json({ message: 'Blog not found' });
      }
  
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  blogRouter.delete("/delete", async (req, res) => {
    try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    
   
    if (!blog) {
      return res.status(400).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    });

    module.exports={
      blogRouter
    }
  