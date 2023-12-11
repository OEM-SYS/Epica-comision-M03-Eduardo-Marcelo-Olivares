import {useForm} from "react-hook-form";
import NavbarPrivate from "../components/NavbarPrivate";
import {usePosts} from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {useAuth} from "../context/AuthContext";

export const PostForm= () => {
    const {register, handleSubmit, setValue, reset }=useForm();

    const {user}= useAuth();

    const navigate = useNavigate();

    const {createPost, getAllPosts, getPostById, updatePost,}=usePosts();

    const onSubmit= handleSubmit(async (data) => {
        try {
          const response = await createPost(data);
      
          // Accede al valor de status directamente desde la respuesta
          const status = response.status;
          console.log('Status:', status);
      
          if (status === 200) {
            // La solicitud fue exitosa, puedes realizar acciones adicionales aquí
            console.log('Post creado exitosamente. ID:', response.data._id);
      
            // Restablecer el formulario si es necesario
            handleReset();

            //ir a mostrar el posteo
            navigate(`/postprivate/${response.data._id}`);
          } else {
            // La solicitud no fue exitosa, manejar el error si es necesario
            console.log(`Hubo un error al crear el post. Status: ${status}  Mensaje de error: ${response.data.message}`);
          }
        } catch (error) {
          // Manejar errores si la promesa se rechaza
          //console.error('Error:', error.response.data.message);
          console.error('Error:', error);
        }
      });

    const handleReset = () => {
         // Solo resetear los campos innesesarios (en este caso, "title", "description" y "imageURL") author debe mantener la ID
        reset({
            title: "",
            description: "",
            imageURL: "",
            completed: false,
        });  
      };

    return(
        <>
            <NavbarPrivate/>
            <div className="flex h-screen items-center justify-center">
                <div className=" bg-zinc-800 bg-opacity-25 max-w-md p-8 rounded-md ">
                    <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">CREATE NEW POST</h1>
                    <form onSubmit={onSubmit}>
                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Post Title"
                            {...register("title")}
                            autoFocus
                        />

                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Author"
                            {...register("author")}
                            value={user.id}
                            autoFocus
                        />
                    
                        <textarea
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            rows="3"
                            placeholder="Description"
                            {...register("description")}
                        ></textarea>

                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Image URL"
                            {...register("imageURL")}
                            autoFocus
                        />

                        <label>Completed</label>
                        <input type="checkbox" {...register("completed")} />
                        <button
                            className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm "
                            type="submit"
                        >
                            Save
                        </button>

                    </form>
                </div>
            </div>

        </>
    );
};