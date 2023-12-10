import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
const NavbarPrivate = () => {
    const {signout, user} = useAuth();
  return (
        <nav className="navbar p-1">
    <div className="flex justify-between items-center">
    <div>
        <Link to="/">
            <span className='astroFontHollow text-4xl text-blue-400 font-bold'>A</span>
            <span className='astroFontRegular text-4xl text-blue-400'>T</span>
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
        <span className='astroFontRegular text-3xl text-blue-400'>{user.username}</span>
        <a href="/login" className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm "
        onClick={()=>signout()}
        >Logout</a>
    </div>
    </div>
    </nav>
  );
};

export default NavbarPrivate;