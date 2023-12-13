import {useForm} from "react-hook-form";
import NavbarPublic from "../components/NavbarPublic";
import NavbarPrivate from "../components/NavbarPrivate";
import {usePosts} from "../context/PostContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { PostMini } from "../components/PostMini";


function Posts(){
    const { isAuthenticated } = useAuth();
    const { getAllPosts, post } = usePosts();

    //useEffect para traer los posteos cuando se ejecuta esta pagina
    // Obtener todos los posteos
    useEffect(() => {
        getAllPosts();
    }, []);
    if (post.length === 0)
    return (
        <>
        {isAuthenticated ? <NavbarPrivate/> : <NavbarPublic/>}
        
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">There are no posts created at the moment</h1>
        </>
    );


    return(
        <>
        {isAuthenticated ? <NavbarPrivate/> : <NavbarPublic/>}
        
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">POSTS</h1>
        <div className="grid grid-cols-3 gap-2">
            {
            post.map((post, i) => (
            <PostMini post={post} key={i} />
            ))
            }
        </div>
        </>
    );
};

export default Posts;