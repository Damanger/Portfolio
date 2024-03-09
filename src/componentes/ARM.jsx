import React, { useState } from 'react';
import '../assets/css/arm.css';

const ARM = () => {
    const [textContent, setTextContent] = useState('Ingrese sus instrucciones :)');
    const [isCheckedInstruccion, setIsCheckedInstruccion] = useState(true);
    const [isCheckedHexadecimal, setIsCheckedHexadecimal] = useState(false);
    const [isCheckedBinario, setIsCheckedBinario] = useState(false);

    const handleContentChange = (event) => {
        setTextContent(event.target.value);
    };

    const handleCheckboxChange = (checkboxType) => {
        switch (checkboxType) {
            case 'instruccion':
                setIsCheckedInstruccion(!isCheckedInstruccion);
                setIsCheckedHexadecimal(false);
                setIsCheckedBinario(false);
                break;
            case 'hexadecimal':
                setIsCheckedInstruccion(false);
                setIsCheckedHexadecimal(!isCheckedHexadecimal);
                setIsCheckedBinario(false);
                break;
            case 'binario':
                setIsCheckedInstruccion(false);
                setIsCheckedHexadecimal(false);
                setIsCheckedBinario(!isCheckedBinario);
                break;
            default:
                break;
        }
    };

    const checkboxStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: '2rem'
    };

    return (
        <>
            <div className="page_wrap">
                <div className="main_page">
                    <div className="page_content" contentEditable onInput={handleContentChange} dangerouslySetInnerHTML={{ __html: textContent }}></div>
                </div>
            </div>
            <div className="checkbox-wrapper">
                <span style={checkboxStyle}>
                    Instrucción
                    <input type="checkbox" className="check" id="check1" checked={isCheckedInstruccion} onChange={() => handleCheckboxChange('instruccion')} />
                </span>

                <span style={checkboxStyle}>
                    Hexadecimal
                    <input type="checkbox" className="check" id="check2" checked={isCheckedHexadecimal} onChange={() => handleCheckboxChange('hexadecimal')} />
                </span>

                <span style={checkboxStyle}>
                    Binario
                    <input type="checkbox" className="check" id="check3" checked={isCheckedBinario} onChange={() => handleCheckboxChange('binario')} />
                </span>
            </div>
        </>
    );
};

export default ARM;
