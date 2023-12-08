import React, { useState } from 'react';
import '../assets/css/arm.css';

const ARM = () => {
    const [textContent, setTextContent] = useState(
        'Ingrese sus instrucciones :)'
    );

    const handleContentChange = (event) => {
        setTextContent(event.target.value);
    };

    return (
        <>
            <div className="page_wrap">
                <div className="main_page">
                    <div className="page_content" contentEditable onInput={handleContentChange} dangerouslySetInnerHTML={{ __html: textContent }}></div>
                </div>
            </div>
        </>
    );
};

export default ARM;
