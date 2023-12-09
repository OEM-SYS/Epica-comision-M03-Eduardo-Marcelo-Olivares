import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
const NavbarPrivate = () => {
    const {signout} = useAuth();
  return (
        <nav className="navbar p-1">
    <div className="flex justify-between items-center">
    <div>
        <Link to="/">
            <spam className='astroFontHollow text-4xl text-blue-400 font-bold'>A</spam>
            <spam className='astroFontRegular text-4xl text-blue-400'>T</spam>
        </Link>
    </div>
    <div className="flex-grow text-center">
        <Link to="/newpost" className="text-white">Create New Post</Link>
    </div>
    <div className="flex-grow text-center">
        <Link to="/posts" className="text-white">View All Post</Link>
    </div>
    <div className="flex-grow text-center">
        <Link to="/profile" className="text-white">My Profile</Link>
    </div>
    <div className="space-x-4">
        <Link to="/login" className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm "
        onClick={()=>signout()}
        >Logout</Link>
    </div>
    </div>
    </nav>
  );
};

export default NavbarPrivate;