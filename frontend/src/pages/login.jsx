import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarPublic from "../components/NavbarPublic";

function Login(){

    const { register, handleSubmit, formState:{errors} } = useForm();
    //le damos una alias e Errors para poder identificarlo mejor
    const {signin, isAuthenticated, errors:loginErrors } = useAuth();
    //console.log("Errores que vienen del backend \n",registerErrors); 
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) navigate("/posts");
      //if (isAuthenticated) navigate("/postPRIVATE/6567bc49bbe35624b7c9af05");
    }, [isAuthenticated]);
  
    const onSubmit = handleSubmit(async (values) => {
      signin(values); 
      console.log("evento onsubmit mostrando valores de login ",values);
    });


    return(
      <>
        <NavbarPublic/>
        <div className="flex h-screen items-center justify-center">
            <div className=" bg-zinc-800 bg-opacity-25 max-w-md p-8 rounded-md ">
                <form action="">
                    <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">LOGIN</h1>
                    <input type="email" {...register("email",{required:true})}
                    placeholder="email"
                    className="w-full bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <input type="password" {...register("password",{required:true})} 
                    placeholder="Password"
                    className="w-full bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <button className="bg-blue-600 h-10 px-7 font-semibold text-antique-500 rounded-sm  my-5" 
                    onClick={onSubmit}>Login</button>
                </form>
                <p className="flex justify-between mt-10">You don't have an account? 
                    <Link to="/register" 
                    className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm ">Register</Link>
                </p>
                <div className="py-4">
                  {
                  loginErrors && loginErrors.errors && (
                    loginErrors.errors.map((error, i)=>(
                      <div className="bg-red-500  text-antique-500 px-2" key={i}>
                        {error.msg}
                      </div>
                    ))
                  )
                  }
                </div>
            </div>
        </div>
      </>
    );
};

export default Login;