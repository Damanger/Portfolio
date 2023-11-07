import React from 'react';
import '../assets/css/error.css';
import { Link } from 'react-router-dom';

const Error404 = () =>{
    return (
        <div className="containerE"> 
            <div className="window"> 
                <div className="window-title">
                    <p>Squirrel cmd</p>
                    <div className="window-buttons">
                        <div className="window-button fullscreen"></div>
                        <div className="window-button reduce"></div>
                        <div className="window-button close"></div>
                    </div>
                </div>
                <div className="console">
                    <pre><code><h1>        Error 404!!!</h1> 
                        <p>                  web page not found</p>
                        <Link to="/" style={{textDecoration: "none", color: "red"}}>                    return to portfolio</Link></code></pre>
                </div>
            </div>
        </div>
    )
}

export default Error404