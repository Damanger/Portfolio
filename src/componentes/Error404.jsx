import React from 'react';
import '../assets/css/error.css';

const Error404 = () =>{
    return (
        <div className="container"> 
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
                        <p>                  web page not found</p></code></pre>
                </div>
            </div>
        </div>
    )
}

export default Error404