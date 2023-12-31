import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/raffle.css';
import jsPDF from 'jspdf';
import ReactModal from 'react-modal';
import Confetti from 'react-confetti';

const Raffle = () =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tiros, setTiros] = useState(4);
    const [showConfetti, setShowConfetti] = useState(false);
    const [spinButtonDisabled, setSpinButtonDisabled] = useState(false);
    const [inputNumber, setInputNumber] = useState('');

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [number, setNumber] = useState(Math.ceil(Math.random() * 500000));
    const [clicks, setClicks] = useState(0);
    const [clienteNumbers, setClienteNumbers] = useState([]);

    const spinAudioRef = useRef(null);
    const victoryAudioRef = useRef(null);

    useEffect(() => {
        const audio = new Audio('spin.mp3');
        const audio2 = new Audio('victory.mp3')
        spinAudioRef.current = audio;
        victoryAudioRef.current = audio2
    }, []);

    const handleSpinClick = () => {
        if (clicks < 4) {
            setNumber(number + Math.ceil(Math.random() * 500000));
            setClicks(clicks + 1);
            setTiros(tiros - 1);
            if (spinAudioRef.current) {
                spinAudioRef.current.play();
            }
            setSpinButtonDisabled(true);
            setTimeout(() => {
                setSpinButtonDisabled(false);
            }, 3000);
        }
        if (tiros === 1) {
            setShowConfetti(true);
            victoryAudioRef.current.play();
        }
    };    
    
    const handleRemoveNumber = () => {
        const numberToRemove = parseInt(inputNumber);
        if (!isNaN(numberToRemove)) {
            const updatedNumbers = clienteNumbers.filter(
                (number) => parseInt(number) !== numberToRemove
            );
            setClienteNumbers(updatedNumbers);
            setInputNumber('');
        }
    };      

    useEffect(() => {

        // Función para calcular y mostrar la cuenta regresiva
        function countdown() {
            const targetDate = new Date("2023-12-01T00:00:00");
            const currentDate = new Date();
            const timeDifference = targetDate - currentDate;

            if (timeDifference <= 0) {
                document.getElementById("countdown-timer").innerHTML = "<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>";
                return;
            }

            const secondsInMilliSeconds = 1000;
            const minutesInMilliSeconds = secondsInMilliSeconds * 60;
            const hoursInMilliSeconds = minutesInMilliSeconds * 60;
            const daysInMilliSeconds = hoursInMilliSeconds * 24;
            const monthsInMilliSeconds = daysInMilliSeconds * 30.4375; // Aproximadamente 30.44 días por mes promedio

            const months = Math.floor(timeDifference / monthsInMilliSeconds);
            const days = Math.floor((timeDifference % monthsInMilliSeconds) / daysInMilliSeconds);
            const hours = Math.floor((timeDifference % daysInMilliSeconds) / hoursInMilliSeconds);
            const minutes = Math.floor((timeDifference % hoursInMilliSeconds) / minutesInMilliSeconds);
            const seconds = Math.floor((timeDifference % minutesInMilliSeconds) / secondsInMilliSeconds);

            const countdownContainer = document.getElementById("countdown-timer");
            countdownContainer.innerHTML = `
                <div class="countdown-part">
                    <div>Meses:</div>
                    <span>${months.toString().padStart(2, '0')}</span>
                </div>
                <div class="countdown-part">
                    <div>Días:</div>
                    <span>${days.toString().padStart(2, '0')}</span>
                </div>
                <div class="countdown-part">
                    <div>Horas:</div>
                    <span>${hours.toString().padStart(2, '0')}</span>
                </div>
                <div class="countdown-part">
                    <div>Minutos:</div>
                    <span>${minutes.toString().padStart(2, '0')}</span>
                </div>
                <div class="countdown-part">
                    <div>Segundos:</div>
                    <span>${seconds.toString().padStart(2, '0')}</span>
                </div>
            `;

            // Actualizar la cuenta regresiva cada segundo
            setTimeout(countdown, 1000);
        }

        // Variables para rastrear los números seleccionados
        const selectedNumbers = new Set();

        // Función para generar la lista de números de boletos como un calendario
        function generateTicketCalendar() {
            const ticketList = document.getElementById("ticket-numbers");
            for (let i = 89; i <= 89; i++) {
                const listItem = document.createElement("li");
                listItem.textContent = i;
                listItem.addEventListener("click", toggleTicketSelection);
                ticketList.appendChild(listItem);
            }
        }

        function toggleTicketSelection(event) {
            const ticket = event.target;
            const ticketNumber = parseInt(ticket.textContent);

            // Desseleccionar cualquier número previamente seleccionado
            const selectedTicketNumbers = document.querySelectorAll(".selected");
            for (const selectedTicket of selectedTicketNumbers) {
                selectedTicket.classList.remove("selected");
            }
            selectedNumbers.clear(); // Borrar cualquier número previamente seleccionado

            // Seleccionar el número actual
            selectedNumbers.add(ticketNumber);
            ticket.classList.add("selected");

            // Actualizar el contenido del número de boleto seleccionado y el mensaje
            const selectedTicketNumber = document.getElementById("selected-ticket-number");
            const ticketOwnerName = document.getElementById("ticket-owner-name");
            const downloadIcon = document.querySelector(".download-icon");

            if (clientData[ticketNumber]) {
                selectedTicketNumber.textContent = ticketNumber;
                ticketOwnerName.textContent = " comprado por: " + clientData[ticketNumber];
                downloadIcon.style.display = "inline"; // Mostrar el ícono de descarga
            } else {
                selectedTicketNumber.textContent = ticketNumber;
                ticketOwnerName.textContent = " está disponible";
                downloadIcon.style.display = "none"; // Ocultar el ícono de descarga
            }
        }

        // Función para leer el contenido del archivo clientes.txt
        function readClientFile() {
            // Crear una instancia de FileReader
            const reader = new FileReader();

            // Configurar una función de devolución de llamada cuando se complete la lectura del archivo
            reader.onload = function(event) {
                // El contenido del archivo está en event.target.result
                const fileContent = event.target.result;

                // Extraer números y nombres del contenido del archivo
                extractNumbersAndNames(fileContent);

                // Marcar los números en el calendario
                markNumbersInCalendar(Object.keys(clientData).map(Number));
            };

            // Leer el contenido del archivo clientes.txt
            fetch('./clientes.txt')
                .then(response => response.text())
                .then(data =>{
                    const numbers = data.split('\n');
                    const cleanedNumbers = numbers.filter(number => number.trim() !== '');
                    setClienteNumbers(cleanedNumbers);
                    reader.readAsText(new Blob([data]))
                })
                .catch(error => console.error('Error reading file:', error));
        }

        // Declara un objeto para almacenar números y nombres
        const clientData = {};

        // Función para extraer números y nombres del contenido del archivo
        function extractNumbersAndNames(fileContent) {
            // Utilizar una expresión regular para encontrar números y nombres en el contenido del archivo
            const regex = /(\d+)\s+([^\n]+)/g;
            const matches = fileContent.matchAll(regex);

            // Iterar sobre las coincidencias y almacenarlas en el objeto clientData
            for (const match of matches) {
                const number = parseInt(match[1]);
                const name = match[2].trim();
                clientData[number] = name;
            }
        }

        // Función para marcar números en el calendario como azules y mostrar nombres como tooltips
        function markNumbersInCalendar(numbers) {
            const ticketList = document.getElementById("ticket-numbers");
            const ticketItems = ticketList.getElementsByTagName("li");

            // Iterar sobre los números en el calendario
            for (const ticketItem of ticketItems) {
                const ticketNumber = parseInt(ticketItem.textContent);

                // Comprobar si el número está en la lista de números del archivo
                if (numbers.includes(ticketNumber)) {
                    // Marcar el número como azul
                    ticketItem.style.backgroundColor = "#76a57f"; // Color de fondo verde pastel
                    ticketItem.style.color = "#fff";
                    ticketItem.disabled = true; // Deshabilitar el número

                    // Agregar un tooltip con el nombre al hacer hover sobre el número
                    ticketItem.setAttribute("title", clientData[ticketNumber]);
                }
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            // Obtiene el elemento <span> que contiene la palabra "Blue"
            const blueSpan = document.querySelector(".blue-span");

            // Variable para rastrear el estado de color actual
            let isBlue = false;

            // Función para cambiar el color de blueSpan
            function toggleColor() {
                if (isBlue) {
                    blueSpan.style.color = "white";
                } else {
                    blueSpan.style.color = "#5981c6";
                }
                    isBlue = !isBlue;
            }

            // Llama a la función toggleColor cada 3 segundos
            setInterval(toggleColor, 3000);
        });

        // Llamar a la función para leer el archivo al cargar la página
        window.onload = function () {
            readClientFile();
            countdown(); // Iniciar la cuenta regresiva
            generateTicketCalendar(); // Generar el calendario de números
        };

        setShowConfetti(true);

        document.getElementById("generarPDF").addEventListener("click", function () {
            const nombre = document.getElementById("ticket-owner-name").innerText;
            const numeroBoleto = document.getElementById("selected-ticket-number").innerText; 

            // Crear un nuevo documento PDF con formato A6
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a6",
            });

            const image = new Image()

            image.src = "./Ardilla.webp"

            // Establecer el color de fondo de la página a "#a6c1ee"
            doc.setFillColor(166, 193, 238); // Código de color "#a6c1ee"
            doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Llena la página con el color

            // Calcular el centro de la página
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const textWidth = doc.getStringUnitWidth(nombre) * doc.internal.getFontSize();
            const x = (pageWidth - textWidth) / 4;
            const y = (pageHeight - doc.internal.getLineHeight()) / 2;

            // Agregar el número de boleto en la parte superior
            doc.setTextColor(0, 0, 0); // Establecer el color del texto a negro
            doc.setFontSize(12);
            doc.addImage(image, "png", 0, 0, 25,30)
            doc.text("#"+numeroBoleto, pageWidth / 2, y-20, { align: 'center' }); // Alineado al centro en la parte superior

            doc.text("Boleto" + nombre, x + 60, y);
            doc.text("Rifa a efectuarse el 1 de Diciembre del 2023", x + 60, y + 20);

            // Agregar pie de página en negritas
            doc.setFont("helvetica", "bold");
            const footerText = "*Favor de mostrar identificación en caso de ser ganador/ganadora*";
            const footerWidth = doc.getStringUnitWidth(footerText) * doc.internal.getFontSize();
            const footerX = (pageWidth - footerWidth) / 2;
            const footerY = pageHeight - 15;
            doc.text(footerText, footerX + 122, footerY);

            // Generar el PDF y descargarlo
            doc.save("Boleto.pdf");
        }, []);
    })
    return (
        <>
            <header className='headerRaffle'>
                <h1>¡Rifa de Audífonos Sony WH-CH520N <span className="blue-span">Blue</span>!</h1>
            </header>
            <main>
                <div className="countdown">
                    <h2>Cuenta regresiva para el 1 de Diciembre</h2>
                    <div id="countdown-timer"></div>
                </div>
                <div className="video">
                    <iframe className="responsive-iframe" src="https://www.youtube.com/embed/o1eoCYG7c0c?si=NddVIav7i3alVaLo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy"></iframe>
                </div>              
                        
                <div className="ticket-calendar">
                    {/*  <h2>Números de Boletos</h2> */}
                    <h2>¡Ganador de la Rifa!</h2>
                    {/* <h3>*Costo del boleto 1 x $30 o 2 x $50*</h3>
                    <h4>**Si eres Utemita 1 boleto $20**</h4> */}
                    <div id="ticket-owner-info">
                        <p>Eduardo Soto<span id="selected-ticket-number"></span><span id="ticket-owner-name"></span>
                        <i id="generarPDF" className="fas fa-download download-icon" style={{display: "none"}}></i></p>
                    </div>            
                    <ul id="ticket-numbers"></ul>    
                    {/*                               
                    <div id="comprado-indicator">
                        <div className="comprado-box" style={{backgroundColor: "#76a57f"}}></div>
                        <div className="comprado-label">Comprado</div>
                    </div>
                    <div id="disponible-indicator">
                        <div className="disponible-box" style={{backgroundColor: "#d3d3d3"}}></div>
                        <div className="disponible-label">Disponible</div>
                    </div>
                    */}
                    {/* <button className='modal' onClick={openModal}>Probar Suerte</button> */}
                    {/* <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Ejemplo Modal" ariaHideApp={false} style={{
                        overlay: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(5px)'
                        },
                        content: {
                            position: 'fixed',
                            width: '65rem',
                            height: '60rem',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    }}> 
                        <div className="modal-content">
                            <div className="middle">
                                <div className="title-container">
                                    <h1 style={{ marginTop: '0' }}>Ruleta aleatoria</h1>
                                    <p>Tiros restantes: #{tiros}</p>
                                    <img className="arrow" src="./arrow.webp" alt="flecha" style={{ position: 'relative', zIndex: '1' }}/>
                                </div>
                            </div>
                            <audio id="spinAudio" src="spin.mp3" user-interaction="true"></audio>
                            <audio id="winner" src="victory.mp3" user-interaction="true"></audio>
                            <button id="spin" data-audio-src="spin.mp3" onClick={handleSpinClick} disabled={spinButtonDisabled}>Spin</button>
                            <div className="container" style={{ transform: `rotate(${number}deg)` }}>
                                
                                {clienteNumbers.map((numero, index) => {
                                    const spaceIndex = numero.indexOf(' '); // Find the first space character
                                    const displayedText = spaceIndex !== -1 ? numero.substring(0, spaceIndex) : numero; // Extract the substring up to the first space or display the entire number
                                    const pastelColors = [
                                        '#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#d35400'
                                    ];
                                    const backgroundColor = pastelColors[index % pastelColors.length];
                                    const style = {
                                        display: 'flex',
                                        alignItems: 'start',
                                        justifyContent: 'center',
                                        fontSize: '1rem',
                                        clipPath: 'polygon(50% 100%, 44% 0%, 56% 0)',
                                        backgroundClip: 'border-box',
                                        backgroundColor: backgroundColor,
                                        transform: `rotate(${(360 / clienteNumbers.length) * index}deg)`,
                                    };
                                    return (
                                        <div key={index} className={`number-${index + 1}`} style={style}>
                                            {displayedText}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="base">
                                <button className='modalC' onClick={closeModal} >Cerrar</button>
                                <input type="number" id='number-input' autoComplete='off' value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} placeholder="# a eliminar"/>
                                <button className='eliminar' onClick={handleRemoveNumber}>Descartar</button>
                            </div>
                        </div>
                    </ReactModal> */}
                </div>
                
                <footer>
                    <h4 style={{textAlign: "center"}}>¿Interesad@? Contáctame</h4>
                    <div className="social-buttons">
                        <a href="https://wa.me/5219514084765?text=Buen%20d%C3%ADa,%20quisiera%20comprar%20un%20boleto%20por%20favor." target="_blank" rel='noreferrer' className="social-button whatsapp">
                            <i className="Raffle-icon fab fa-whatsapp"></i>                 
                        </a>
                        <a href="https://www.facebook.com/Damanger/" target="_blank" rel='noreferrer' className="social-button facebook">
                            <i className="Raffle-icon fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/ich_bin_omarrmz/" target="_blank" rel='noreferrer' className="social-button instagram">
                            <i className="Raffle-icon fab fa-instagram"></i>
                        </a>
                    </div>
                </footer>
            </main>
            <div className="wrap">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {showConfetti && <Confetti
                width={window.innerWidth}
                height={window.innerHeight*2}
                recycle={true}
                numberOfPieces={1000}
                initialVelocityY={5}
                friction={0.99}
                gravity={0.1}
                colors={['#ff0000', '#00ff00', '#0000ff']}
            />}
        </>
    )
}

export default Raffle