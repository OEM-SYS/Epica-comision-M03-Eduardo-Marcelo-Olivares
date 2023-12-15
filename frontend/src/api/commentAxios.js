import axios from "./setCredentials";

const createCommentReq = (id, comment) => axios.post(`/comment/${id}`, comment);

export default createCommentReq;