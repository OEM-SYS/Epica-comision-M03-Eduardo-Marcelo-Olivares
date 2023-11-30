import Post from "../models/post.model.js";

export const getAllPost = async(req, res)=>{
    //res.json({message:"TODOS LOS POSTEOS"});
    try{
        const allPost = await Post.find().populate("author");
        res.status(200).json(allPost);
    }
    catch(error){
        return res.status(400).json({ message: "Error when searching for Posts"});
    }
};

export const getAllPostByUser= async(req, res)=>{
    //res.json({message:"TODOS LOS POSTEOS POR USUARIO"});
    try{
        const allPost = await Post.find({
            author:req.user.id
        }).populate("author");
        res.status(200).json(allPost);
    }
    catch(error){
        return res.status(400).json({ message: "Error when searching for Posts"});
    }
};

export const getPostByID = async(req, res)=>{
    const {id}=req.params;
    try{
        const postFound = await Post.findById(id).populate("author");
        if(!postFound)
            return res.status(404).json({ message: "Post not Found"});

        res.status(200).json(postFound);
    }
    catch(error){
        return res.status(400).json({ message: "Error when searching for a Post"});
    }
};

export const createPost = async(req, res)=>{
    const {title, description, comments, imageURL }= req.body;
    try{
       const newPost = new Post({
            title,
            description,
            author :req.user.id,
            comments,
            imageURL
        });
        const postSaved = await newPost.save();
        res.status(200).json(postSaved);
        }
    catch(error){
        return res.status(400).json({ message: "Error creating Post"});
    }
};

export const updatePost = async(req, res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true}).populate("author");
        if(!updatedPost)
            return res.status(404).json({ message: "Post not Found"});

        res.status(200).json(updatedPost);
    }
    catch(error){
        console.log("src/controllers/post.comtroller.js dump error= ",error);
        return res.status(400).json({ message: "Error when updating for a Post"});
    }
};

export const deletePost = async(req, res)=>{
    try{
        const deletedPost= await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost)
            return res.status(404).json({ message: "Post not Found"});
        res.status(200).json({message:"Post Deleted"});
        }
    catch(error){
        return res.status(400).json({ message: "Error when deleting a Post"});
    }
};