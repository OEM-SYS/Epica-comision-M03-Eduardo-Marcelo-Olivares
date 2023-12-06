import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import  Register  from "./pages/Register";
import  Login  from "./pages/login";
import { AuthProvider } from "./context/AuthContext";

//todos los componentes de adentro prodan acceder al Authprovider (signup, user,isAuthenticated)
export const App= ()=>{
return(
  <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<h1>profile</h1>}/>
          <Route path="/allposts" element={<h1>all Post</h1>}/>
          <Route path="/addpost" element={<h1>add Post</h1>}/>
          <Route path="/viewpost" element={<h1>view Post</h1>}/>
        </Routes>
    </Router>
  </AuthProvider>
  );
};
