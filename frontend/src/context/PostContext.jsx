import {createContext, useContext, useState} from "react";
import {getPostsReq, getPostByIdReq, createPostReq, updatePostReq, deletePostReq} from "../api/postAxios";

const PostContext = createContext();

export const usePosts = () => {

    const context = useContext(PostContext);
    if (!context) throw new Error("Error in the context of the Posts");
    return context;
};

export const PostProvider = ({children})=>{
    //generar el post y estados para exportar en el PostProvider
    const [post, setPost]=useState([]);

    // crear un post
    const createPost = async (post) =>{
        //console.log(post);
        const res = await createPostReq(post);
        //console.log(res);
        return res;
    };

    //Buscar todos los posts
    const getAllPosts = async () => {
        const res = await getPostsReq();
        // console.log(res);
        try {
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    //Buscar post por Id
    const getPostById = async (id) => {
        try {
        const res = await getPostByIdReq(id);
        // console.log(res);
        //retornamos para que lo pueda ver en el PostForm
        return res.data;
        } catch (error) {
        console.log(error);
        }
    };

    //Modificar post
    const updatePost = async (id, post) => {
        try {
          const res = await updatePostReq(id, post);
        } catch (error) {
          console.log(error);
        }
      };

    //Eliminar post
    const deletePost = async (id) => {
        try {
        const res = await deletePostReq(id);
        // console.log(res);
        if (res.status === 200) setPost(post.filter((post) => post._id !== id));
        } catch (error) {
        console.log(error);
        }
    };

    return(
        <PostContext.Provider value={{
            post,
            createPost,
            getAllPosts,
            getPostById,
            updatePost,
            deletePost
        }}>
            {children}
        </PostContext.Provider>
    );
};