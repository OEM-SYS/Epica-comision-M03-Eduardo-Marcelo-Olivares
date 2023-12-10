import { useNavigate, Link } from "react-router-dom";
import NavbarPublic from "../components/NavbarPublic";
function Home(){

    return(
        <>
        <NavbarPublic/>
        <h1 className="text-9xl text-center text-blue-400  mb-5 astroFontHollow">ASTRONOMIC</h1>
        <h1 className="text-8xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">TRAVELS</h1>
        <div className="flex items-center justify-center">
            <div>
                <p className="w-full text-4xl  text-antique px4 py-1 my-2"><span className="font-bold text-white">Your space</span> to tell your travels of astronomical observations.</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2"><span className="font-bold text-white">Share</span> your experiences, show your photos</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2"><span className="font-bold text-white">Many people</span> will comment on your travels</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2">let us <span className="font-bold text-white">begin..</span></p>
                
                <div className="w-80">
                    <p className="flex justify-between  mt-5">You don't have an account? 
                                <Link to="/register" 
                                className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm ">Register</Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;