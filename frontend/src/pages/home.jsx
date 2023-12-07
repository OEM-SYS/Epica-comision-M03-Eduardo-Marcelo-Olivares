import { useNavigate, Link } from "react-router-dom";
function Home(){

    return(
        <>
        <p className="">Your space to tell your travels of astronomical observations.</p>
            <p>Share your experiences, show your photos</p>
            <p>Many people will comment on your travels</p>
            <p>let us begin..</p>
        
        <p className="flex mt-10">You don't have an account? 
                    <Link to="/register" 
                    className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm ">Register</Link>
        </p>
        </>
    );
};

export default Home;