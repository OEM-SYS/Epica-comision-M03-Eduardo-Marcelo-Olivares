import { useNavigate, Link, json } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";
import {useAuth} from "../context/AuthContext";
function Profile(){
    const {user}= useAuth();
    return(
        <>
        <NavbarPrivate/>
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">PROFILE</h1>
        {JSON.stringify(user,null,3)};
        </>
    );
};

export default Profile;