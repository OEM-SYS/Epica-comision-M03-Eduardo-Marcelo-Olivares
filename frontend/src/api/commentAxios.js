import axios from "./setCredentials";

export const createCommentReq = (id, comment) => axios.post(`/comment/${id}`, comment);

export const deleteCommentReq = (id, comment) => axios.delete(`/comment/${id}`, comment);
