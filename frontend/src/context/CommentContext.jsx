import {createContext, useContext, useState} from "react";
import createCommentReq from "../api/commentAxios";

const CommentContext = createContext();

export const useComment = () => {

    const context = useContext(CommentContext);
    //console.log("context creado",context);
    if (!context) throw new Error("Error in the context of the Comment");
    return context;
};


export const CommentProvider = ({children})=>{
    //generar el comment y estados para exportar en el CommmentProvider
    const [comment, setComment]=useState([]);

    // crear un comment
    const createComment = async (id,comment) =>{
        //console.log(comment);
        const res = await createCommentReq(id,comment);
        //console.log(res);
        return res;
    };
    return(
        <CommentContext.Provider value={{
            comment,
            createComment,
        }}>
            {children}
        </CommentContext.Provider>
    );
};
