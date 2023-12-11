import {useForm} from "react-hook-form";
import NavbarPublic from "../components/NavbarPublic";
import NavbarPrivate from "../components/NavbarPrivate";
import {usePosts} from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {useAuth} from "../context/AuthContext";

export const PostPrivate= () => {
    const {register, handleSubmit, setValue, reset, watch }=useForm();

    const {user,isAuthenticated}= useAuth();

    const navigate = useNavigate();

    const {createPost, getAllPosts, getPostById, updatePost,}=usePosts();

    // Obtener el parámetro id de la URL utilizando useParams
    const { id } = useParams();

    //console.log(">>>>>>>>>>>>>>>>>la id: ",id);

    //useEffect para traer las tareas cuando se ejecuta esta pagina
    // Obtén los datos del post por ID
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getPostById(id);
            //console.log(">>>>>contenido de response getPostById(id) >>>>>>",response);
            //console.log(">>>>>contenido author >>>>>>",response.author.username);
            // Llena los campos del formulario con los datos obtenidos
            setValue("title", response.title);
            setValue("author", response.author.username);
            setValue("description", response.description);
            setValue("imageURL", response.imageURL);
            //setValue("completed", response.data.completed);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
        };

        fetchData();
    }, [id, getPostById, setValue]);

    //watch se usa para obtener el valor actualizado de imageURL
    //se importa el react-hook-form y se desestructura con useForm
    const imageURL = watch("imageURL");  

    

    return(
        <>
            {isAuthenticated ? <NavbarPrivate/> : <NavbarPublic/>}
            <div className="flex h-screen items-center justify-center">
                <div className=" bg-zinc-800 bg-opacity-25 max-w-md p-8 rounded-md ">
                    <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">VIEW POST</h1>
                    <form >
                    <label>Author</label>
                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Author"
                            {...register("author")}
                            autoFocus
                        />
                    <label>Title</label>
                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Post Title"
                            {...register("title")}
                            autoFocus
                        />

                        <label>Description</label>
                        <textarea
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            rows="3"
                            placeholder="Description"
                            {...register("description")}
                        ></textarea>

                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="hidden" 
                            placeholder="Image URL"
                            {...register("imageURL")}
                            autoFocus
                        />

                        <label>Image</label>
                        {/* Utiliza directamente el valor de la imagen para el atributo src */}
                        {imageURL && (
                            <img
                                src={imageURL}
                                alt="Post Image"
                                className="w-full rounded-md my-2"
                            />
                        )}
          

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