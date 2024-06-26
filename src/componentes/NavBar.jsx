import React from 'react';
import '../assets/css/navbar.css';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const NavBar = () =>{
    return (
        <nav className="navbar2" style={{backgroundColor: "#3b82f6", display: "flex", justifyContent: "space-between", padding: "1rem ", height: "10%", alignItems: "center"}}>
            <Link to="/" className="logo" rel='noreferrer'>
                <LazyLoad threshold={0.95}>
                    <img className='logo-img' src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/omar.webp" alt="Omar Cruz" style={{ width: '15rem', height: 'auto' }}/>
                </LazyLoad>
            </Link>
            <div className="cipher Project-Links" style={{fontSize: "1.75rem"}}>
                <Link className="Link-Project" to="https://www.omar-cruz-rmz.com/map" target="_blank" rel='noreferrer'>
                    Map
                </Link>
                <Link className="Link-Project" to="https://www.omar-cruz-rmz.com/Binary" target="_blank" rel='noreferrer'>
                    Binary
                </Link>
                <Link className="Link-Project" to="https://ixvanna.vercel.app/" target="_blank" rel='noreferrer'>
                    Ixvanna
                </Link>
                <Link className="Link-Project" to="https://www.omar-cruz-rmz.com/Assistant" target="_blank" rel='noreferrer'>
                    Assistant
                </Link>
                <Link className="Link-Project" to="https://www.omar-cruz-rmz.com/typing" target="_blank" rel='noreferrer'>
                    Typing
                </Link>
                <Link className="Link-Project" to="https://damanger.github.io/Headphones-Raffle/" target="_blank" rel='noreferrer'>
                    Raffle
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;
