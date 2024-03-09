import React, { useState } from 'react';
import '../assets/css/binary.css';
import NavBar from './NavBar';

const Binary = () => {
    const [convertedText, setConvertedText] = useState('');

    function convertText() {
        const text = document.getElementById("text").value;
        let result = "";

        if (/^[01 ]+$/.test(text)) {
            // binary to text
            const binaryArray = text.split(" ");
            for (let i = 0; i < binaryArray.length; i++) {
                result += String.fromCharCode(parseInt(binaryArray[i], 2));
            }
        } else {
            // text to binary
            for (let i = 0; i < text.length; i++) {
                result += text[i].charCodeAt(0).toString(2) + " ";
            }
        }
        setConvertedText(result.trim());
    }

    return (
        <>
            <NavBar/>
            <div className="binary-container">
                <h1>Binary-Text and Text-Binary</h1>
            </div>
            <div className="form-container">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="text">Enter your text or binary to convert:</label>
                        <input type="text" id="text" placeholder='Hello World!' />
                        <button type="button" onClick={convertText} className="form-submit-btn">Convert!</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textarea">Converted text:</label>
                        <textarea id="result" name="textarea" value={convertedText} readOnly placeholder="01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 00100001"></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Binary;
