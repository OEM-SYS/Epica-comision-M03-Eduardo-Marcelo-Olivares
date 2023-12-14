import {useForm} from "react-hook-form";
import NavbarPublic from "../components/NavbarPublic";
import NavbarPrivate from "../components/NavbarPrivate";
import { useNavigate, Link, json, useParams  } from "react-router-dom";
import { useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";



function Profile(){
    const {user, getUsertById}= useAuth();

    useEffect(() => {
    //const userFinded = await getUsertById(comment.author);///////ver parametro
    }, []);

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


    return(
        <>
        <NavbarPrivate/>
        <h1 className="text-3xl text-center text-blue-400 font-semibold mb-5 astroFontRegular">PROFILE</h1>
        {/*JSON.stringify(user,null,3)*/};


        <div className="flex items-center justify-center">
            <div className="bg-zinc-800 bg-opacity-30 max-w-md w-full p-10 rounded-md">
                <form>

                <label htmlFor="author">User Name</label>
                <input
                    id="author"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md bg-opacity-25"
                    type="text"
                    placeholder="Author"
                    value={user.username}
                    />

                <label htmlFor="author">Avatar</label>
                    <img
                    src={user.avatarURL}
                    className="w-full h-55 rounded-full object-cover mr-2"
                    alt="Author Avatar"
                    />
                    
                

                <label htmlFor="title">email</label>
                <input
                    id="title"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 bg-opacity-25"
                    type="text"
                    placeholder="email"
                    value={user.email}
                />

            
                    <label>Member From</label>
                        <input
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            type="text" 
                            placeholder="Member From"
                            value={formattedDate(user.createdAt)}
                            readOnly
                            autoFocus
                        />
                </form>
            </div>
            </div>
        </>
    );
};

export default Profile;