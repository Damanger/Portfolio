import React, { useEffect } from 'react';
import '../assets/css/inicio.css';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular, faReact, faSwift, faNode, faJs, faApple, faWindows, faLinux, faHtml5, faCss3, faGit, faJava, faPython } from '@fortawesome/free-brands-svg-icons';

const Inicio = () => {
    useEffect(() => {
        //navbar icon
        let menuIcon = document.querySelector('#menu-icon');
        let navbar = document.querySelector('.navbar');
        menuIcon.onclick = () =>{
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        }

        // Scroll
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('header nav a');

        window.onscroll = () =>{
            sections.forEach(sec =>{
                let top = window.scrollY;
                let offset = sec.offsetTop - 100;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if(top >= offset && top < offset+ height){
                    //activate navbar
                    navLinks.forEach(links => {
                        links.classList.remove('active');
                        let targetLink = document.querySelector('header nav a[href*="' + id +'"]');
                        if (targetLink) {
                            targetLink.classList.add('active');
                        }
                    });
                }
            });
            let header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 100);
            // Remove navbar when clicked
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }

        // Obtén el formulario
        const form = document.querySelector('form');

        // Agrega un evento 'submit' al formulario
        form.addEventListener('submit', function(event) {
          event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
          // Inicializa EmailJS con tu clave pública
            emailjs.init('1wQ5hcO2lkSg1UWH6');

            // Obtén los valores de los campos del formulario
            const fullNameInput = document.querySelector('#full-name-input');
            const emailInput = document.querySelector('#email-input');
            const phoneNumberInput = document.querySelector('#phone-number-input');
            const subjectInput = document.querySelector('input[placeholder="Email Subject"]');
            const messageTextarea = document.querySelector('textarea[placeholder="Your message goes here"]');

            // Crea un objeto con los datos del formulario
            const formData = {
                name: fullNameInput.value,
                email: emailInput.value,
                phoneNumber: phoneNumberInput.value,
                subject: subjectInput.value,
                message: messageTextarea.value
            };

            // Envía el formulario a través de EmailJS
            emailjs.send("service_7ac3amo", "template_1ngo741", {from_name: 'Name: ' + formData.name + '\nEmail: ' + formData.email + '\nPhone Number: ' + formData.phoneNumber + '\nSubject: ' + formData.subject, message: '\nMessage:' + formData.message})
            .then(function(response) {
                Swal.fire(
                    'Email sent!',
                    'Your email was sent successfully!',
                    'success'
                );
            }, function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, email could not being sent!'
                });
            });
        });
    });

    return (
        <div>
            <input type="checkbox" id="toggle"></input>
            <header className="header">
                <a href="/" className="logo" rel='noreferrer'>
                    Omar ♱
                </a>
                <div className="bx bx-menu" id="menu-icon"></div>
                <nav className="navbar">
                    <a href="#home" className="active cipher" rel='noreferrer'>Home</a>
                    <a href="#about" className="cipher" rel='noreferrer'>About</a>
                    <a href="#journey" className="cipher" rel='noreferrer'>Journey</a>
                    <a href="#skills" className="cipher" rel='noreferrer'>Skills</a>
                    <a href="#projects" className="cipher" rel='noreferrer'>Projects</a>
                    <a href="#contact" className="cipher" rel='noreferrer'>Contact</a>
                    <span className="active-nav"></span>
                </nav>
            </header>

            <section className="home" id="home">
                <div className="home-content">
                    <h1>Hello, I'm <span> Omar Cruz</span></h1>
                    <div className="text-animate">
                        <h2>Jr. Web Developer</h2>
                    </div>
                    <p>Computer engineering student at Universidad Tecnológica de la Mixteca.
                        Adept in multiple programming languages and offers great task prioritization.
                        Willingness to take on added responsibilities to meet team goals. 
                        Ability to handle multiple projects simultaneously with a high degree of accuracy.
                    </p>
                    <div className="btn-box">
                        <a href="https://drive.google.com/uc?export=download&id=1R6TWe_8ONA1OViFb4XFXTxa8x-pBUI8u" className="btn" download="CV.pdf">CV<i className="fas fa-cloud-download-alt"></i></a>
                        <a href="#contact" className="btn">Let's talk.</a>
                    </div>
                    <div className="wrapper">
                        <div className="icon whatsapp">
                            <a href="https://wa.me/5219514084765?text=Buen%20d%C3%ADa,%20quise%20contactarlo%20para%20desarrollar%20un%20servicio%20web." target="_blank" rel='noreferrer'>
                                <span><i className="fab fa-whatsapp"></i></span>
                            </a>
                        </div>                
                        <div className="icon linkedin">
                            <div className="tooltip">
                                LinkedIn
                            </div>
                            <a href="https://www.linkedin.com/in/omar-cruzr97" target="_blank" rel='noreferrer'><span><i className="fab fa-linkedin"></i></span></a>
                        </div>
                        <div className="icon github">
                            <div className="tooltip">
                                Github
                            </div>
                            <a href="https://github.com/Damanger" target="_blank" rel='noreferrer'><span><i className="fab fa-github"></i></span></a>
                        </div>
                    </div>
                </div>
                <div className="home-imgHover"><img src="./yo.jpeg" alt="selfie"/></div>
            </section>

            <section className="about" id="about">
                <h2 className="heading">About <span>Me</span></h2>
                <div className="about-img">
                    <img src="./yo.png" alt="selfie"/>
                    <span className="circle-spin"></span>
                </div>
                <div className="about-content">
                    <h3>Hello and welcome to my website! My name is Omar Cruz and I would like to share a bit about who I am as a person.</h3>
                    <p>I am a responsible individual with a strong sense of initiative and a proactive mindset. Taking ownership of my responsibilities comes naturally to me, as I believe in delivering high-quality results and meeting deadlines consistently. Furthermore, I possess strong leadership qualities, which allow me to guide and inspire others towards achieving common goals. I thrive in collaborative environments, valuing teamwork and actively contributing to the success of the group.</p>
                </div>
            </section>

            <section className="education" id="journey">
                <h2 className="heading">My <span>Journey</span></h2>
                <div className="education-row">
                    <div className="education-column">
                        <h3 className="title">Professional Experience</h3>
                        <div className="education-box">

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                    <h3>Laboratory of Advanced Image Processing (LAPI)-U.N.A.M.</h3>
                                    <p>Intern, Laboratory of Advanced Image Processing (LAPI), National Autonomous University of Mexico (UNAM)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-column">
                        <h3 className="title">Education</h3>
                        <div className="education-box">

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2023 - Today</div>
                                    <h3>ONE - Oracle & Alura</h3>
                                    <p>In this year, I enrolled in a course called Oracle Next Education (ONE), offered by Oracle and Alura. I am currently part of Group 5 and still actively pursuing the program.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2020 - Today</div>
                                    <h3>Computer Engineering - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I am currently pursuing a Bachelor's degree in Computer Engineering and I am in my 7th semester out of 10.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2009  - 2013</div>
                                    <h3>English Courses - Harmon Hall</h3>
                                    <p>I completed over 50 levels of basic English for children and an additional 15 levels of intermediate English for young learners at a private school.</p>
                                    <p>Also completed 4 advanced levels of conversational English for adults.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-column">
                        <h3 className="title">Experience</h3>
                        <div className="education-box">

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2022 - Today</div>
                                    <h3>Web Developer - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying HTML, CSS, JavaScript, and TypeScript since the fifth semester, utilizing frameworks such as Angular. I have already created several web pages as part of my projects.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2021 - Today</div>
                                    <h3>SQL - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying SQL programming language since the fourth semester and have gained practical experience working with databases in various projects.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2021  - Today</div>
                                    <h3>Java programming - Universidad Tecnológica de la Mixteca</h3>
                                    <p>Since the third semester, I have been studying the Java programming language and have already completed several projects, including a compiler and complex regex search.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2020 - Today</div>
                                    <h3>Python programming - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying the Python programming language since the first semester and have already completed several projects, including a compiled Spanish version of Python.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2020  - Today</div>
                                    <h3>C programming - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying the C programming language since the first semester and have already completed several projects, including a shell simulator.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="skills" id="skills">
                <h2 className="heading">My <span>Skills</span></h2>
                <div className="skills-row">
                    <div className="skills-column">
                        <h3 className="title">Coding Skills</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="progress">
                                    <h3> Apple, Linux, Windows, Angular, React, JavaScript, HTML, CSS, Git, SQL, C, Java, Python, Node, Terminal, Swift</h3>
                                    <div className="carousel-container">
                                        <div className="carousel-items">
                                            <FontAwesomeIcon icon={faApple} className='Apple'/>
                                            <FontAwesomeIcon icon={faLinux} className='Linux'/>
                                            <FontAwesomeIcon icon={faWindows} className='Windows'/>
                                            <FontAwesomeIcon icon={faAngular} className='Angular'/>
                                            <FontAwesomeIcon icon={faReact} className='React'/>
                                            <FontAwesomeIcon icon={faJs} className='JavaScript'/>
                                            <FontAwesomeIcon icon={faHtml5} className='HTML'/>
                                            <FontAwesomeIcon icon={faCss3} className='CSS'/>
                                            <FontAwesomeIcon icon={faGit} className='Git'/>
                                            <i className="fa-solid fa-database SQL"></i>
                                            <i className="fa-solid fa-c C"></i>
                                            <FontAwesomeIcon icon={faJava} className='Java'/>
                                            <FontAwesomeIcon icon={faPython} className='Python'/>
                                            <FontAwesomeIcon icon={faNode} className='Node'/>
                                            <FontAwesomeIcon icon={faSwift} className='Swift'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="skills-column">
                        <h3 className="title">Soft Skills</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="progress">
                                    <h3> Respectfulness, Empathic, Motivated, Team-building, Confidence <span>100%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> Analytical thinking, Adaptability, Decision-making <span>90%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> Analysis, Communication, Research, Prioritization <span>85%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> Ambitious, Innovation<span>80%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="skills-column">
                        <h3 className="title">Professional Skills</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="progress">
                                    <h3> Spanish (Native) <span>100%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> English, Web Design, Web Development <span>80%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> Blender, SolidWorks<span>75%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> Italian <span>30%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>

                                <div className="progress">
                                    <h3> German <span>20%</span></h3>
                                    <div className="bar"><span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="education" id="projects">
                <h2 className="heading">My <span>Projects</span></h2>
                    <div className="education-column">
                        <h3 className="title">Headphone Raffle</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://www.omar-cruz-rmz.com/raffle" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023-today</div>
                                        <h3>Oaxaca-México</h3>
                                        <i className="fa-solid fa-link"> Raffle of a Sony headphone</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Web Browser</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://github.com/Damanger/Squirrel-Web-Browser.git" target="_blank" rel='noreferrer' id="web-browser">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023-today</div>
                                        <h3>Oaxaca-México</h3>
                                        <i className="fa-solid fa-link"> Simple Web Browser in Python </i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Virtual-Assistant</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://github.com/Damanger/Virtual-Assistant" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023-today</div>
                                        <h3>Oaxaca-México</h3>
                                        <i className="fa-solid fa-link"> Virtual-Assistant </i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">LaPI (React)</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://org-mu-seven.vercel.app/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Oaxaca-México</h3>
                                        <i className="fa-solid fa-link"> LaPI Organization</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Encrypter</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/Challenge1-Alura-Oracle-ONE/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Oaxaca-México</h3>
                                        <i className="fa-solid fa-link"> Alura - Oracle Encrypter/Desencrypter</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Mexico Map</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/Mexico-svg/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Universidad Nacional Autónoma de México</h3>
                                        <i className="fa-solid fa-link"> Internship works (Mexico map)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">World Map</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/World-svg/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Universidad Nacional Autónoma de México</h3>
                                        <i className="fa-solid fa-link"> Internship works (World map)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Rappi-like app</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/login_UTasteM/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2022-2023</div>
                                        <h3>Universidad Tecnológica de la Mixteca</h3>
                                        <i className="fa-solid fa-link"> Rappi-like website (Contact me for more info)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Spanish Version of Python (compiler)</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://github.com/Damanger/Compilador-python" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2022</div>
                                        <h3>Universidad Tecnológica de la Mixteca</h3>
                                        <i className="fa-solid fa-link"> A spanish compiled version of Python (Contact me for more info)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">Carrer Project</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/login-glassmorphism/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2022</div>
                                        <h3>Universidad Tecnológica de la Mixteca</h3>
                                        <i className="fa-solid fa-link"> Computer Engineering career project (Contact me for more info)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">3D Game</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://github.com/Damanger/3DGame" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2022</div>
                                        <h3>Universidad Tecnológica de la Mixteca</h3>
                                        <i className="fa-solid fa-link"> 3D basic cars game (Contact me for more info)</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <h3 className="title">2D Game</h3>
                        <div className="education-box">
                            <div className="education-content">
                                <a href="https://damanger.github.io/Car-Game-Js/" target="_blank" rel='noreferrer' id="raffle-link">
                                    <div className="content">
                                        <div className="year"><i className="bx bxs-calendar"></i>2021</div>
                                        <h3>Universidad Tecnológica de la Mixteca</h3>
                                        <i className="fa-solid fa-link"> 2D basic cars game</i>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
            </section>

            <section className="contact" id="contact">
                <h2 className="heading">Contact <span>Me!</span></h2>
                <form action="#">
                    <div className="input-box">
                        <div className="input-field">
                            <input type="text" id="full-name-input" placeholder="Full Name" required pattern="^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,}(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,})?(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,}){1,2}$" autoComplete="off"/>
                        <div className="name-container">
                            <div className="name-requirements" style={{ fontSize: '1.2rem' }}>
                                Enter a valid name.
                            </div>
                        </div>
                            <span className="focus"></span>                    
                        </div>
                        <div className="input-field">
                            <input type="email" id="email-input" placeholder="Email Adress" required pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/" autoComplete="off"/>
                            <div className="email-requirements" style={{ fontSize: '1.2rem' }}>
                                Enter a valid email.
                            </div>
                            <span className="focus"></span>                    
                        </div>
                    </div>

                    <div className="input-box">
                        <div className="input-field">
                            <input type="number" id="phone-number-input" placeholder="Phone Number" required pattern="[0-9]{10,13}" autoComplete="off"/>
                                <div className="phone-container">
                                    <div className="phone-requirements" style={{ fontSize: '1.2rem' }}>
                                        Phone number must have between 10-13 numbers.
                                    </div>
                                </div>
                            <span className="focus"></span>                    
                        </div>
                        <div className="input-field">
                            <input type="text" placeholder="Email Subject" required pattern="[a-zA-Z]{2,}" autoComplete="off"/>
                            <div className="subject-container">
                                <div className="subject-requirements" style={{ fontSize: '1.2rem' }}>
                                    Enter a subject.
                                </div>
                            </div>
                            <span className="focus"></span>                    
                        </div>
                    </div>

                    <div className="textarea-field">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Your message goes here" required></textarea>
                        <span className="focus"></span>
                    </div>
                    <div className="btn-box btns">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </section>

            <footer>
                <div className="footer">
                    <div className="footer-text">
                    <p>Copyright &copy; 2023 by Omar A. Cruz Ramírez All Rights Reserved. </p>
                    </div>
                    <div className="footer-iconTop">
                        <a href="/"><i className="bx bx-up-arrow-alt"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Inicio;
