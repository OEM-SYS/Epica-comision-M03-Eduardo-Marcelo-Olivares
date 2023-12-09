import React from 'react';
import { Link } from 'react-router-dom';

const NavbarPublic = () => {
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
        <Link to="/posts" className="text-white">View All Post</Link>
    </div>
    <div className="space-x-4">
        <Link to="/login" className="bg-green-500 font-semibold px-7 text-antique-500 rounded-sm ">Login</Link>
        <Link to="/register" className="bg-blue-600 h-10 px-7 font-semibold text-antique-500 rounded-sm  my-5">Register</Link>
    </div>
    </div>
    </nav>
  );
};

export default NavbarPublic;