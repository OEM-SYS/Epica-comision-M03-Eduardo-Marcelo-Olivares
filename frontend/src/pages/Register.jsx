import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register(){

       const { register, handleSubmit, formState:{errors} } = useForm();
       //le damos una alias e Errors para poder identificarlo mejor
       const { signup, isAuthenticated, errors: registerErrors } = useAuth();
       //console.log("Errores que vienen del backend \n",registerErrors); 
       const navigate = useNavigate();
     
       useEffect(() => {
         if (isAuthenticated) navigate("/allposts");
       }, [isAuthenticated]);
     
       const onSubmit = handleSubmit(async (values) => {
         signup(values); 
       
    });


    return(
        <div className="flex h-screen items-center justify-center">
            <div className=" bg-zinc-800 max-w-md p-8 rounded-md">
                <form action="">
                    <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFont">REGISTER</h1>
                    <input type="text"  placeholder="User Name" {...register("username",{required:true})}
                    className="w-full text-3x1 bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <input type="email" {...register("email",{required:true})}
                    placeholder="email"
                    className="w-full text-3x1 bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <input type="password" {...register("password",{required:true})} 
                    placeholder="Password"
                    className="w-full text-3x1 bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <input type="text" name="avatarURL" 
                    {...register("avatarURL",{required:false})}
                    placeholder="avatar URL"
                    className="w-full text-3x1 bg-zinc-600 text-antiquewhite px4 py-2 my-2 rounded-sm px-2"/>
                    <button className="bg-blue-600 h-10 px-7 font-semibold text-antique-500 rounded-sm  my-5" 
                    onClick={onSubmit}>Register</button>
                </form>
                <p className="flex justify-between mt-10">You have an account? 
                  <Link to="/login" 
                  className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm ">Login</Link>
                </p>
                <div className="py-4">
                  {
                  registerErrors && registerErrors.errors && (
                    registerErrors.errors.map((error, i)=>(
                      <div className="bg-red-500  text-antique-500" key={i}>
                        {error.msg}
                      </div>
                    ))
                  )
                  }
                </div>
            </div>
        </div>
    );
};
export default Register;