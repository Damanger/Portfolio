import React from 'react';
import '../assets/css/navbar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar2" style={{ backgroundColor: "#3b82f6", display: "flex", justifyContent: "space-between", padding: "1rem 10%", height: "10%", alignItems: "center" }}>
            <NavLink to="/" className="logo" rel='noreferrer'>
                <img className='logo-img' src="./omar.webp" alt="Omar Cruz" />
            </NavLink>
            <div className="cipher Project-Links" style={{ fontSize: "1.75rem" }}>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://www.omar-cruz-rmz.com/Binary">
                    Binary
                </NavLink>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://ixvanna.vercel.app/">
                    Ixvanna
                </NavLink>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://www.omar-cruz-rmz.com/Assistant">
                    Assistant
                </NavLink>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://www.omar-cruz-rmz.com/ARM">
                    ARM
                </NavLink>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://www.omar-cruz-rmz.com/typing">
                    Typing
                </NavLink>
                <NavLink className="Link-Project" activeClassName="active-link" exact to="https://damanger.github.io/Headphones-Raffle/">
                    Raffle
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;
