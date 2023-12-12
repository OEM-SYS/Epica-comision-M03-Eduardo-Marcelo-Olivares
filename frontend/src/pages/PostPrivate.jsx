import {useForm} from "react-hook-form";
import NavbarPublic from "../components/NavbarPublic";
import NavbarPrivate from "../components/NavbarPrivate";
import {usePosts} from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";


export const PostPrivate= () => {
    const {register, handleSubmit, setValue, reset, watch }=useForm();

    const {user,isAuthenticated, getUsertById }= useAuth();
    console.log(">>>>>>>>>contenido de user en useAuth>>>>>>>".user);
  
    let UserIdLogin="0";
    if(user&&user.id){
        UserIdLogin=user.id;
        //console.log(">>>>>>>>> contenido de user.id >>>>>>>>>>",UserIdLogin);
    }
    else{
        //console.log(">>>>>>>>> no puedo acceder al contenido de user.id >>>>>>>>>>");
    }

    const navigate = useNavigate();

    const {createPost, getAllPosts, getPostById, updatePost, deletePost}=usePosts();

    // Obtener el parámetro id de la URL utilizando useParams
    const { id } = useParams();

    //console.log(">>>>>>>>>>>>>>>>>la id: ",id);

    //funcion para formatear la fecha y hora en JavaScript, usando objeto Date y sus métodos
    const formattedDate = (createdAt) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };

    const date = new Date(createdAt);
    return date.toLocaleString('es-ES', options);
    };

    // Nuevo estado para almacenar comentarios inicia con arreglo vacio
    //no olvidar importar useState de react
    const [comments, setComments] = useState([]);
    const [canEditAndDelete, setCanEditAndDelte] = useState(false);
    const [commentsWithUsernames, setCommentsWithUsernames] = useState([]);

    //useEffect para traer las tareas cuando se ejecuta esta pagina
    // Obtén los datos del post por ID
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getPostById(id);
            console.log(">>>>>contenido de response getPostById(id) >>>>>>",response);
            //console.log(">>>>>contenido author >>>>>>",response.author.username);
            //console.log(">>>>>>contenido createdAt",response.createdAt);
            // Llena los campos del formulario con los datos obtenidos
            if(UserIdLogin==response.author._id){
                console.log("el autor y el usuario es el mismo!!! :) ",UserIdLogin,"  ",response.author._id);
                setCanEditAndDelte(true);
            }
            else{
                console.log("el autor y el usuario NO es el mismo!!! :( ",UserIdLogin,"  ",response.author._id);
            }

            //se almacena en el ESTADO comments  , los comentarios traidos en la respuesta
            setComments(response.comments);

            setValue("title", response.title);
            setValue("author", response.author.username);
            setValue("description", response.description);
            setValue("imageURL", response.imageURL);
            setValue("createdAt", formattedDate(response.createdAt));
            //setValue("completed", response.data.completed);
            //setValue("comments", response.comments);

            //###########################################
            // Consulta adicional para obtener usernames de los autores de los comentarios
            const commentsData = await Promise.all(
                response.comments.map(async (comment) => {
                    console.log("###############los usuarios######", comment.author);
                const userFinded = await getUsertById(comment.author);
                return {
                    ...comment,
                    authorUsername: userFinded.username,
                };
                })
            );
                
            setCommentsWithUsernames(commentsData);

            //###########################################

        } catch (error) {
            console.error('Error fetching post:', error);
        }
        };

        fetchData();
    }, [id, getPostById, setValue]);

    //watch se usa para obtener el valor actualizado de imageURL
    //se importa el react-hook-form y se desestructura con useForm
    const imageURL = watch("imageURL");  
    //const createdAt = watch("createdAt");

    

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

                        {/*<label>Created At</label>
                        <span className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">{createdAt}</span>
                        */}
                        <label>Created At</label>
                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Created At"
                            {...register("createdAt")}
                            readOnly
                            autoFocus
                        />
                        
                        {/*bloque botones*/}
                        {canEditAndDelete && (
                        <div className="flex justify-between items-center">
                            <label>Completed</label>
                            <input type="checkbox" {...register("completed")} />
                            <button
                                className="bg-yellow-500 font-semibold px-7 text-antique-500 rounded-sm "
                                type="submit"
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 font-semibold px-7 text-antique-500 rounded-sm "
                                type="submit"
                            >
                                Delete
                            </button>
                        </div>
                        )}


                    </form>
                </div>
            </div>

            {/* Mostrar comentarios */}
            <diV>
                <div className="flex h-min items-center justify-center">
                    <div className=" bg-zinc-800 bg-opacity-25 max-w-md p-8 rounded-md ">
                        
                            <h2 className="text-2xl font-semibold text-blue-400 mb-3">Comments</h2>

                            <ul>
                            {/*comments.map((comment) => (
                                <li key={comment._id}>
                                <p className="text-gray-400">Author: {comment.author}</p>
                                <p className="text-white-600">{comment.description}</p>
                                </li>
                            ))*/}
                            {commentsWithUsernames.map((comment) => (
                                <li key={comment._id}>
                                    <p className="text-blue-400">Author: {comment.authorUsername}</p>
                                    <p className="text-white">{comment.description}</p>
                                
                                </li>
                            ))}

                            </ul>
                        
                    </div>
                </div>
            </diV>

        </>
    );
};