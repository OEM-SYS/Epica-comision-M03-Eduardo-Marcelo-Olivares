import { useNavigate, Link } from "react-router-dom";
import NavbarPrivate from "../components/NavbarPrivate";
function Profile(){

    return(
        <>
        <NavbarPrivate/>
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">PROFILE</h1>
        </>
    );
};

export default Profile;