import { useNavigate, Link } from "react-router-dom";
function Home(){

    return(
        <>
        <h1 className="text-9xl text-center text-blue-400  mb-5 astroFontHollow">ASTRONOMIC</h1>
        <h1 className="text-8xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">TRAVELS</h1>
        <div className="flex items-center justify-center">
            <div>
                <p className="w-full text-4xl  text-antique px4 py-1 my-2"><spam className="font-bold">Your space</spam> to tell your travels of astronomical observations.</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2"><spam className="font-bold">Share</spam> your experiences, show your photos</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2"><spam className="font-bold">Many people</spam> will comment on your travels</p>
                <p className="w-full text-2xl  text-antique px4 py-1 my-2">let us <spam className="font-bold">begin..</spam></p>
                
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