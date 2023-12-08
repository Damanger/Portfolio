// Home.jsx
import React, { useState } from 'react';
import '../assets/css/arm.css';

const ARM = () => {
    const [textContent, setTextContent] = useState(
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum nemo provident, quasi, dolor accusantium distinctio animi eius architecto enim nihil ratione. Reiciendis sit magni incidunt odit perferendis culpa saepe alias!'
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
