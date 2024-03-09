import React from 'react';
import '../assets/css/binary.css';
import { Link } from 'react-router-dom';

const Binary = () =>{
    return (
        <>
            <div className="binary-container">
                <h1>Binary-Text and Text-Binary</h1>
            </div>
            <div className="form-container">
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="text">Enter you text or binary to convert:</label>
                        <input type="text" id="text" placeholder='Hello World!'/>
                        <button type="submit"  className="form-submit-btn">Convert!</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textarea">Converted text:</label>
                        <textarea id="result" name="textarea" placeholder="01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 00100001"></textarea>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Binary