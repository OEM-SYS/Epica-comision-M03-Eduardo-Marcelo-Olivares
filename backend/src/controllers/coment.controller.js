import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getAllComment = async(req, res)=>{
    //res.json({message:"TODOS LOS COMENTARIOS"});
    try{
        //################# deberia colocar?    .populate("post")
        const allComment = await Comment.find().populate("author").populate("post");
        res.status(200).json(allComment);
    }
    catch(error){
        return res.status(400).json({ message: "Error when searching for Comments"});
    }
};


export const getCommentByID = async(req, res)=>{
    const {id}=req.params;
    try{
        //################# deberia colocar?    .populate("post")
        const commentFound = await Comment.findById(id).populate("author").populate("post");;
        if(!commentFound)
            return res.status(404).json({ message: "Comment not Found"});

        res.status(200).json(commentFound);
    }
    catch(error){
        return res.status(400).json({ message: "Error when searching for a Comment"});
    }
};


export const createComment = async(req, res)=>{
    try{
        const {author, description, }= req.body;
        const postId= req.params.postId;
       
        // Para crear el comentario primero hay que Consultar si el Author existe 
        const existingUser = await User.findById(author);
        if (!existingUser) 
            return res.status(404).json({ message: "User not Found" });
 
        //Tambien consultar si existe el Posteo
        const existingPost = await Post.findById(postId);
        if (!existingPost)
            return res.status(404).json({ message: 'Post not Found' });

        // tener en cuenta que al crear el comentario esta incluido el enlace a post
        const newComment = new Comment({ author, description, post: postId });
        const commentSaved = await newComment.save();

        // Añadir el comentario al array de comentarios del post
        // existingPost.comments.push({ idComment: postId });
        existingPost.comments.push(commentSaved._id);
      
       // Guardar el post actualizado
        await existingPost.save();
        
        res.status(200).json(commentSaved);
        }
    catch(error){
        console.log("src/controllers/comment.controler.js  createComment dump error catch \n",error);
        return res.status(400).json({ message: "Error creating Comment"});
    }
};


export const updateComment = async(req, res)=>{
    const { description } = req.body;
    const commentId = req.params.id;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { description },
            { new: true }
        );

        if (!updatedComment)
            return res.status(404).json({ error: "Comment not Found" });
    
        res.status(200).json(updatedComment);
         }
    catch(error){
        return res.status(400).json({ message: "Error when updating for a Post"});
    }
};

//antes de eliminar debo recuperar el POST  en base al comment._id
//no exportare por el momento esta funcion ya que es para uso de este controlador unicamente
const findPostByCommentId = async (commentId) => {
    try {
        const post = await Post.findOne({ comments: commentId }).populate('comments').exec();
        console.log("Post Found ",post);
        return post;
    } 
    catch (error) {
        console.error('Error when searching for post by comment ID:', error);
        throw error;
    }
  };

//Para eliminar el comentario utilizo primero la funcion de busqueda por commentId que devuelve el ID de post
//no exportare por el momento esta funcion ya que es para uso de este controlador unicamente
const findAndRemoveCommentId = async (commentId) => {
    try {
        // Buscar el post que contiene commentId
        const post = await findPostByCommentId(commentId);
        if (!post) {
            console.log('The post containing the comment ID was not found.');
            return null;
        }
        // Eliminar la commentId del array comments
        const updatedPost = await Post.findOneAndUpdate(
            { 
            _id: post._id,
            comments: commentId
            },
            { 
            $pull: { comments: commentId }
            },
            { 
            new: true
            }
        ).populate('comments').exec();
  
        console.log(updatedPost);
        return updatedPost;
        } 
        catch (error) {
            console.error('Error finding and deleting comment ID:', error);
            throw error;
        }
  };



// al borrar el comentario , se llama al funcion que tambien lo elimina del post donde fue publicado
export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        //primero se elimina el enlace al comentario en el modelo Post
        findAndRemoveCommentId(commentId);
        //luego se elimina el comentario
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment)
            return res.status(404).json({ error: "Comment not found" });

        res.status(204).end();
    } 
    catch (error) {
      res.status(400).json({ error: "Error when deleting a Comment" });
    }
  };