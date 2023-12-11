import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import  Home  from "./pages/Home";
import  Register  from "./pages/Register";
import  Login  from "./pages/login";
import  {PostForm} from "./pages/PostForm";
import {PostPrivate} from "./pages/PostPrivate";
import  Posts  from "./pages/Posts";
import  Post  from "./pages/Post";
import PostsPrivate from "./pages/PostsPrivate";
import  Profile  from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer"
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PostProvider } from "./context/PostContext";

//todos los componentes de adentro prodan acceder al Authprovider (signup, user,isAuthenticated)
export const App= ()=>{
return(
  <AuthProvider>
    <PostProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/post" element={<Post/>}/>

          <Route element={<PrivateRoutes/>}>
            <Route path="/newpost" element={<PostForm/>}/>
            <Route path="/postprivate/:id" element={<PostPrivate/>}/>            

            <Route path="/postsprivate" element={<PostsPrivate/>}/>
            <Route path="/profile" element={<Profile/>}/>
            
          </Route>
        </Routes>
    </Router>
    <Footer />
    </PostProvider>
  </AuthProvider>
  
  );
};
