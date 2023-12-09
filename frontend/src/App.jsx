import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import  Home  from "./pages/Home";
import  Register  from "./pages/Register";
import  Login  from "./pages/login";
import  NewPost from "./pages/NewPost";
import  Posts  from "./pages/Posts";
import  Post  from "./pages/Post";
import PostsPrivate from "./pages/PostsPrivate";
import  Profile  from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer"
import { PrivateRoutes } from "./routes/PrivateRoutes";


//todos los componentes de adentro prodan acceder al Authprovider (signup, user,isAuthenticated)
export const App= ()=>{
return(
  <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/post" element={<Post/>}/>
            
          <Route element={<PrivateRoutes/>}>
            <Route path="/postsprivate" element={<PostsPrivate/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/newpost" element={<NewPost/>}/>
          </Route>
        </Routes>
    </Router>
    <Footer />
  </AuthProvider>
  
  );
};
