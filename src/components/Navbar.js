import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div><i className="material-icons">explore</i></div>
            <div><i className="material-icons">keyboard</i></div>
            <div><i className="material-icons">home</i></div>
        </nav>
    );
}

export default Navbar;