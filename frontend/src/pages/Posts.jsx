//import { useNavigate, Link } from "react-router-dom";
import NavbarPublic from "../components/NavbarPublic";
import NavbarPrivate from "../components/NavbarPrivate";
import { useAuth } from "../context/AuthContext";
function Posts(){
    const { isAuthenticated } = useAuth();
    return(
        <>
        {isAuthenticated ? <NavbarPrivate/> : <NavbarPublic/>}
        
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">POSTS</h1>
        </>
    );
};

export default Posts;