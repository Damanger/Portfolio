import React, { useState, useEffect } from 'react';
import '../assets/css/arm.css';
import NavBar from './NavBar';

const ARM = () => {
    const [inputText, setInputText] = useState('Ingrese sus instrucciones :)\nSerán leidas linea por linea al dar clic en traducir');
    const [isCheckedInstruccion, setIsCheckedInstruccion] = useState(true);
    const [isCheckedHexadecimal, setIsCheckedHexadecimal] = useState(false);
    const [isCheckedBinario, setIsCheckedBinario] = useState(false);
    const [translatedText, setTranslatedText] = useState('');
    const [lines, setLines] = useState([]);

    useEffect(() => {
        if (!isCheckedInstruccion && !isCheckedHexadecimal && !isCheckedBinario) {
            setIsCheckedInstruccion(true);
        }
    }, [isCheckedInstruccion, isCheckedHexadecimal, isCheckedBinario]);

    useEffect(() => {
        const linesArray = inputText.split('\n');
        setLines(linesArray);
    }, [inputText]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
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

    const handleTranslate = () => {
        if (lines.length === 0) return; // No hay líneas para traducir

        const [firstLine, ...remainingLines] = lines; // Obtener la primera línea y las líneas restantes

        // Traducir la primera línea
        const translatedMessage = translateInstruction(firstLine);
        setTranslatedText(translatedMessage);

        // Actualizar el estado de las líneas con las líneas restantes
        setLines(remainingLines);
    };

    const translateInstruction = (instruction) => {
        const opcodes = {
            'ADD': '10001011000',
            'SUB': '11001011000',
            'AND': '10001010000',
            'OR': '10101010000',
            'BR': '11010110000',
            'STUR': '11111000000',
            'LDUR': '11111000010',
            'ADDI': '1001000100',
            'SUBI': '1101000100',
            'ANDI': '1001001000',
            'ORI': '1011001000',
            'CBZ': '10110100',
            'CBNZ': '10110101',
            'B': '000101',
            'BL': '100101'
        };

        const shamt = '000000';
        const op2 = '00';

        const registerMap = {
            '0': '00000',
            '1': '00001',
            '2': '00010',
            '3': '00011',
            '4': '00100',
            '5': '00101',
            '6': '00110',
            '7': '00111',
            '8': '01000',
            '9': '01001',
            '10': '01010',
            '11': '01011',
            '12': '01100',
            '13': '01101',
            '14': '01110',
            '15': '01111',
            '16': '10000',
            '17': '10001',
            '18': '10010',
            '19': '10011',
            '20': '10100',
            '21': '10101',
            '22': '10110',
            '23': '10111',
            '24': '11000',
            '25': '11001',
            '26': '11010',
            '27': '11011',
            '28': '11100',
            '29': '11101',
            '30': '11110',
            '31': '11111'
        };

        instruction = instruction.toUpperCase().replace(/X/g, "").replace(/,/g, "").replace(/\[|\]/g, "").replace(/#/g, "");
        const instructionParts = instruction.split(' ');

        if (instructionParts.length === 2 && opcodes.hasOwnProperty(instructionParts[0])) {
            if (instructionParts[0] === 'BR' && instructionParts[1] !== '30') {
                return 'Error: BR solo acepta BR x30';
            }
            else if (instructionParts[0] === 'B' || instructionParts[0] === 'BL'){
                const opcode = opcodes[instructionParts[0]];
                let dest = parseInt(instructionParts[1]);
                dest = decimalToBinary26(dest);
                const binaryInstruction = `${opcode}${dest}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }
            else {
                const opcode = opcodes[instructionParts[0]];
                const dest = registerMap[instructionParts[1]];
                const binaryInstruction = `${opcode}000000000000000${dest}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }
        }

        if (instructionParts.length === 3 && opcodes.hasOwnProperty(instructionParts[0])) {
            if (instructionParts[0] === 'CBZ' || instructionParts[0] === 'CBNZ') {
                const opcode = opcodes[instructionParts[0]];
                const dest = registerMap[instructionParts[1]];
                let dir = parseInt(instructionParts[2]);
                dir = decimalToBinary19(dir);
                const binaryInstruction = `${opcode}${dest}${dir}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }
        }

        if (instructionParts.length === 4 && opcodes.hasOwnProperty(instructionParts[0])) {
            if (instructionParts[0] === 'STUR' || instructionParts[0] === 'LDUR'){
                const opcode = opcodes[instructionParts[0]];
                const dest = registerMap[instructionParts[1]];
                const rs1 = registerMap[instructionParts[2]];
                let rs2 = parseInt(instructionParts[3]);
                rs2 = decimalToBinary9(rs2);
                const binaryInstruction = `${opcode}${rs2}${op2}${rs1}${dest}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }

            else if (instructionParts[0] === 'ADD' || instructionParts[0] === 'SUB' || instructionParts[0] === 'AND' || instructionParts[0] === 'OR') {
                const opcode = opcodes[instructionParts[0]];
                const dest = registerMap[instructionParts[1]];
                const rs1 = registerMap[instructionParts[2]];
                const rs2 = registerMap[instructionParts[3]];
                const binaryInstruction = `${opcode}${rs2}${shamt}${rs1}${dest}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }
            else if (instructionParts[0] === 'ADDI' || instructionParts[0] === 'SUBI' || instructionParts[0] === 'ANDI' || instructionParts[0] === 'ORI') {
                const opcode = opcodes[instructionParts[0]];
                const dest = registerMap[instructionParts[1]];
                const rs1 = registerMap[instructionParts[2]];
                let inm = parseInt(instructionParts[3]); // Convertir el valor inmediato a entero
                inm = decimalToBinary12(inm);
                const binaryInstruction = `${opcode}${inm}${rs1}${dest}`;
                return `Instrucción traducida: ${binaryInstruction}`;
            }
            else {
                return 'Error: Registros inválidos';
            }
        } else {
            return 'Error: Instrucción inválida';
        }
    };

    const checkboxStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: '2rem'
    };

    const textAreaStyle = {
        width: '45rem',
        height: '44rem',
        marginLeft: '6rem',
        marginTop: '-2rem',
        resize: 'none'
    };

    const textAreaStyle2 = {
        width: '42rem',
        height: '3rem',
        resize: 'none'
    };

    function decimalToBinary26(decimalNumber) {
        let binaryNumber = decimalNumber.toString(2);
        let leadingZeros = 26 - binaryNumber.length;
        if (leadingZeros > 0) {
            binaryNumber = '0'.repeat(leadingZeros) + binaryNumber;
        }
        return binaryNumber;
    }

    function decimalToBinary19(decimalNumber) {
        let binaryNumber = decimalNumber.toString(2);
        let leadingZeros = 19 - binaryNumber.length;
        if (leadingZeros > 0) {
            binaryNumber = '0'.repeat(leadingZeros) + binaryNumber;
        }
        return binaryNumber;
    }

    function decimalToBinary12(decimalNumber) {
        let binaryNumber = decimalNumber.toString(2);
        let leadingZeros = 12 - binaryNumber.length;
        if (leadingZeros > 0) {
            binaryNumber = '0'.repeat(leadingZeros) + binaryNumber;
        }
        return binaryNumber;
    }

    function decimalToBinary9(decimalNumber) {
        let binaryNumber = decimalNumber.toString(2);
        let leadingZeros = 9 - binaryNumber.length;
        if (leadingZeros > 0) {
            binaryNumber = '0'.repeat(leadingZeros) + binaryNumber;
        }
        return binaryNumber;
    }

    return (
        <>
            <NavBar/>
            <h1 className='ArqARM'> Arquitectura ARM </h1>
            <div className="page_wrap">
                <div className="main_page">
                    <textarea value={inputText} onChange={handleInputChange} style={textAreaStyle}></textarea>
                </div>
            </div>
            <img src='map.jpeg' alt="Imagen" className="mapa" />
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
            <div className="resultado">
                <button onClick={handleTranslate} id='translate'>Traducir</button>
                <textarea value={translatedText} readOnly style={textAreaStyle2}></textarea>
            </div>
        </>
    );
};

export default ARM;
