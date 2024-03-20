import React, { useEffect, useState } from 'react';
import '../assets/css/inicio.css';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Inicio = () => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY; // Obtener la posición de desplazamiento vertical
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight; // Calcular la altura total de la página
            const scrolled = (scrollTop / scrollHeight) * 100; // Calcular el porcentaje de desplazamiento

            const scrollWatcher = document.querySelector('.scroll-watcher');
            scrollWatcher.style.width = scrolled + '%'; // Establecer el ancho de la barra de desplazamiento según el porcentaje de desplazamiento
        });
    }, []);

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

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });
        hiddenElements.forEach((el) => observer.observe(el));
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    function handleSearch() {
        // Utiliza el valor de searchQuery para determinar a qué sección redirigir
        const section = searchQuery.toLowerCase();
        if (section.includes('skills') || section.includes('soft') || section.includes('front') || section.includes('back') || section.includes('tools') || section.includes('habilidades')) {
            window.location.href = '#skills';
        }else if (section.includes('about') || section.includes('certificates') || section.includes('certificados') || section.includes('info')) {
            window.location.href = '#about';
        }else if (section.includes('journey') || section.includes('jobs') || section.includes('experience') || section.includes('trabajos') || section.includes('experiencia')) {
            window.location.href = '#journey';
        }else if (section.includes('home') || section.includes('whatsapp') || section.includes('linkedin') || section.includes('github') || section.includes('cv') || section.includes('inicio')) {
            window.location.href = '#home';
        } else {
            switch (section) {
                case 'projects':
                case 'proyectos':
                    window.location.href = '#projects';
                    break;
                case 'contact':
                case 'contacto':
                    window.location.href = '#contact';
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong, your search did not yield any results!'
                    });
            }
        }
        setSearchQuery('');
    }

    function handleSearchInputChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const placeholders = [
        'type "certificates"',
        'type "contact"',
        'type "home"',
        'type "projects"',
        'type "skills"',
        'type "about"',
        'type "front end"',
        'type "back end"',
        'type "soft skills"',
    ];

    const [placeholderN, setPlaceholderN] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderN(prevN => (prevN + 1) % placeholders.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    });

    document.addEventListener('DOMContentLoaded', function () {
        const projectBoxes = document.querySelectorAll('.projects');
    
        projectBoxes.forEach((box) => {
            const hoverImage = box.querySelector('.hover-image');
    
            if (hoverImage) {
                box.addEventListener('mouseover', () => {
                    hoverImage.style.display = 'block';
                });
    
                box.addEventListener('mouseout', () => {
                    hoverImage.style.display = 'none';
                });
            }
        });
    
        document.addEventListener('mousemove', (e) => {
            const hoverImages = document.querySelectorAll('.hover-image');
            hoverImages.forEach((image) => {
                if (image.style.display === 'block') {
                    updateHoverImagePosition(e, image);
                }
            });
        });
    
        function updateHoverImagePosition(e, image) {
            const x = e.clientX;
            const y = e.clientY;
    
            image.style.left = x + 'px';
            image.style.top = y + 'px';
        }
    });    

    return (
        <div>
            <header className="header">
                <a href="#" className="logo" rel='noreferrer'>
                    <img className='logo-img' src="./omar.webp" alt="Omar Cruz" />
                </a>
                <div className="bx bx-menu" id="menu-icon"></div>
                <nav className="navbar">
                    <input type="text" id="search-input" autoComplete='off' name="text" className="input" placeholder={placeholders[placeholderN]} value={searchQuery} onChange={handleSearchInputChange} onKeyPress={handleKeyPress}/>
                    <button className='magnifying' onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
                    <a href="#home" className="active cipher" rel='noreferrer'>Home</a>
                    <a href="#about" className="cipher" rel='noreferrer'>About</a>
                    <a href="#journey" className="cipher" rel='noreferrer'>Journey</a>
                    <a href="#skills" className="cipher" rel='noreferrer'>Skills</a>
                    <a href="#projects" className="cipher" rel='noreferrer'>Projects</a>
                    <a href="#contact" className="cipher" rel='noreferrer'>Contact</a>
                    <span className="active-nav"></span>
                </nav>
                <img className='views' src="https://hitwebcounter.com/counter/counter.php?page=9944997&style=0006&nbdigits=4&type=page&initCount=0" alt="Visit counter For Websites"/>
            </header>

            <div className="scroll-watcher"></div>

            <section className="home hidden" id="home">
                <div className="home-content">
                    <h1>Hello, I'm <span> Omar Cruz</span></h1>
                    <div className="text-animate">
                        <h2>Jr. Web Developer</h2>
                    </div>
                    <p>I'm a Jr. Front-End Web Developer based in Oaxaca, México.</p><p>🚀 Looking to bring your web ideas to life? 🌐💡</p>
                    
                    <div className="btn-box">
                        <a href="https://drive.google.com/file/d/1S97fyfYCfp-zmXnNoZGaJjFg1PL3HX8c/view?usp=drive_link" className="btn" download="CV.pdf">CV<i className="fas fa-cloud-download-alt"></i></a>
                        <a href="#contact" className="btn">Let's talk.</a>
                    </div>
                    <div className="wrapper">
                        <div className="icon whats">
                            <a href="https://wa.me/5219514084765?text=Buen%20d%C3%ADa,%20quise%20contactarlo%20para%20desarrollar%20un%20servicio%20web." target="_blank" rel='noreferrer'>
                                <span><i className="fab fa-whatsapp"></i></span>
                            </a>
                        </div>                
                        <div className="icon linked">
                            <div className="tooltip">
                                LinkedIn
                            </div>
                            <a href="https://www.linkedin.com/in/omar-cruzr97" target="_blank" rel='noreferrer'><span><i className="fab fa-linkedin"></i></span></a>
                        </div>
                        <div className="icon git">
                            <div className="tooltip">
                                Github
                            </div>
                            <a href="https://github.com/Damanger" target="_blank" rel='noreferrer'><span><i className="fab fa-github"></i></span></a>
                        </div>
                    </div>
                </div>
                <div className="home-imgHover"><img src="./yoMemoji.webp" alt="selfie"/></div>
            </section>

            <section className="about hidden" id="about">
                <h2 className="heading">About <span>Me</span></h2>
                <div className="about-img">
                    <img src="./yo.webp" alt="selfie"/>
                    <span className="circle-spin"></span>
                </div>
                <div className="about-content">
                    <h3>Hello and welcome to my website! My name is Omar Cruz and I would like to share a bit about who I am as a person.</h3>
                    <p>I am a responsible individual with a strong sense of initiative and a proactive mindset. Taking ownership of my responsibilities comes naturally to me, as I believe in delivering high-quality results and meeting deadlines consistently. Furthermore, I possess strong leadership qualities, which allow me to guide and inspire others towards achieving common goals. I thrive in collaborative environments, valuing teamwork and actively contributing to the success of the group.</p>
                </div>
                <div className="certificados">
                    <a className="certificado-link" href="https://app.aluracursos.com/program/certificate/3b86f076-e7b1-420b-b3ac-f08d03cbf4d7" target="_blank" rel='noreferrer'>
                        <img alt="Oracle + Alura LATAM certificate" src="./Front-End.webp"/>
                    </a>
                    <a className="certificado-link" href='https://app.aluracursos.com/user/omar-cruzr97/fullCertificate/78801b3b7069693e6a6c314528f4b87f' target='_blank' rel='noreferrer'>
                        <img alt="Jr. Developer" src="./Jr.webp"/>
                    </a>
                    <a className="certificado-link" href='https://app.aluracursos.com/degree/certificate/1fa2dc74-672d-4a1c-bd5b-e50077a537b9' target='_blank' rel='noreferrer'>
                        <img src="React.webp" alt="React" />
                    </a>
                    <a className="certificado-link" href='https://www.linkedin.com/in/omar-cruzr97/' target='_blank' rel='noreferrer'>
                        <img src="./plus.webp" alt="More certificates" />
                    </a>
                </div>
            </section>

            <section className="education hidden" id="journey">
                <h2 className="heading">My <span>Journey</span></h2>
                <div className="education-row">
                    <div className="education-column">
                        <h3 className="title">Professional Experience</h3>
                        <div className="education-box">
                            <div className="education-content">

                                <div className="content">
                                    <a href='www.escolta.io/' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2023 - Today</div>
                                        <h3>Private security company , San Francisco Ca. USA</h3>
                                        <p>Front-End developer, UI design</p>
                                    </a>
                                </div>

                                <div className="content">
                                    <a href='https://dropet.io/' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Automated deployments, San Francisco Ca. USA</h3>
                                        <p>Front-End developer, UI design</p>
                                    </a>
                                </div>

                                <div className="content">
                                    <a href='http://lapi.fi-p.unam.mx/' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                        <h3>Laboratory of Advanced Image Processing (LAPI)-U.N.A.M.</h3>
                                        <p>Intern, Laboratory of Advanced Image Processing (LAPI), National Autonomous University of Mexico (UNAM)</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="education-column">
                        <h3 className="title">Education</h3>
                        <div className="education-box">

                            <div className="education-content">
                                <div className="content">
                                    <a href='https://www.aluracursos.com/cursos-online-front-end' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2023 - Today</div>
                                        <h3>ONE - Oracle & Alura</h3>
                                        <p>In this year, I enrolled in a course called Oracle Next Education (ONE), offered by Oracle and Alura. I am currently part of Group 5 and still actively pursuing the program.</p>
                                    </a>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <a href='https://www.utm.mx/investigacion.html#ic' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2020 - Today</div>
                                        <h3>Computer Engineering - Universidad Tecnológica de la Mixteca</h3>
                                        <p>I am currently pursuing a Bachelor's degree in Computer Engineering and I am in my 7th semester out of 10.</p>
                                    </a>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <a href='https://www.harmonhall.com/' target='_blank' rel='noreferrer'>
                                        <div className="year"><i className="bx bxs-calendar"></i>2009  - 2013</div>
                                        <h3>English Courses - Harmon Hall</h3>
                                        <p>I completed over 50 levels of basic English for children and an additional 15 levels of intermediate English for young learners at a private school.</p>
                                        <p>Also completed 4 advanced levels of conversational English for adults.</p>
                                    </a>
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

            <section className="skills hidden" id="skills">
                <h2 className="heading">My <span>Skills</span></h2>
                <div className="skills-row">
                    <div className="skills-column">
                        <h3 className="title">Front-End</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="items">
                                    <div className="group">
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Angular-FFC8DC?logo=angular&amp;logoColor=f00&amp;style=flat" className="my-1 angular-badge" aria-label="Angular Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/React-61DAFB?logo=react&amp;logoColor=000&amp;style=flat" className="my-1" aria-label="React Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/HTML5-E34F26?logo=html5&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="HTML 5 Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/CSS3-1572B6?logo=css3&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="CSS 3 Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&amp;logoColor=000&amp;style=flat" className="my-1" aria-label="JavaScript Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Materialize-F48BAA?logo=materialize&amp;logoColor=fff&amp;style=flat" className="my-1 materialize-badge" aria-label="Materialize Badge"></object>
                                        </div>

                                    </div>
                                    <div className="group">
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="TypeScript Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Next.js Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Bootstrap Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/jQuery-0769AD?logo=jquery&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Jquerry Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Figma-0078D7?logo=figma&logoColor=fff&style=flat" className="my-1 figma-badge" aria-label="Figma Badge"></object>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="skills-column">
                        <h3 className="title">Back-End</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="items">
                                    <div className="group">
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Node Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="MySQL Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/phpMyAdmin-B73767?logo=phpmyadmin&amp;logoColor=fff&amp;style=flat" className="my-1 phpmmyadmin-badge" aria-label="PHPMyAdmin Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&amp;logoColor=fff&amp;style=flat" className="my-1 postgresql-badge" aria-label="PostgeSQL Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Oracle_Cloud-F80000?logo=oracle&amp;logoColor=fff&amp;style=flat" className="my-1 oracle-cloud-badge" aria-label="Oracle Cloud Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Apple-A9A9A9?logo=apple&logoColor=fff&style=flat" className="my-1 apple-badge" aria-label="Apple Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Linux-000000?logo=linux&logoColor=fff&style=flat" className="my-1 linux-badge" aria-label="Linux Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Windows-0050F0?logo=windows&logoColor=fff&style=flat" className="my-1 windows-badge" aria-label="Windows Badge"></object>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Python-3776AB?logo=python&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Python Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Django-092E20?logo=django&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Django Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Java-ED8B00?logo=java&logoColor=fff&style=flat" className="my-1 java-badge" aria-label="Java Badge"></object>
                                        </div>

                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/C-00599C?logo=c&logoColor=fff&style=flat" className="my-1 c-badge" aria-label="C Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Haskell-29B6F6?logo=haskell&logoColor=fff&style=flat" className="my-1 haskell-badge" aria-label="Haskell Badge"></object>
                                        </div>
                                        <div className="inline-flex mr-2">
                                            <object data="https://img.shields.io/badge/Swift-F05138?logo=swift&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Swift Badge"></object>
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
                                    <h3> Respectfulness<p>Empathic</p><p>Motivated</p><p>Team-building</p><p>Confidence</p><p>Analytical thinking</p><p>Adaptability</p>
                                    <p>Decision-making</p><p>Analysis</p><p>Communication</p><p>Research</p><p>Prioritization</p><p>Ambitious</p><p>Innovation</p> </h3>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="skills-column">
                        <h3 className="title">Professional Skills</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="progress">
                                    <h3> Spanish (Native)<p>English (C1)</p><p>Italian (In progress)</p><p>German (In progress)</p>
                                    <p>Web Design</p><p>Web Development</p>
                                    <p>Blender</p><p>SolidWorks</p></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="skills-column">
                        <h3 className="title">Tools</h3>
                        <div className="skills-box">
                            <div className="skills-content">
                                <div className="items tools">
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Git-F05032?logo=git&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Git Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/GitHub-181717?logo=github&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Github Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="Netlify Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=fff&style=flat" className="my-1 vercel-badge" aria-label="Vercel Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="VSCode Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Xcode-147EFB?logo=xcode&amp;logoColor=fff&amp;style=flat" className="my-1" aria-label="XCode Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/Blender-F5799F?logo=blender&amp;logoColor=fff&amp;style=flat" className="my-1 blender-badge" aria-label="Blender Badge"></object>
                                    </div>
                                    <div className="inline-flex mr-2">
                                        <object data="https://img.shields.io/badge/SolidWorks-FF3300?logo=solidworks&amp;logoColor=fff&amp;style=flat" className="my-1 solidworks-badge" aria-label="SolidWorks Badge"></object>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="education hidden" id="projects">
                <h2 className="heading">My <span>Projects</span></h2>
                <div className="education-column">
                <h3 className="title">Route helping map!</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://www.omar-cruz-rmz.com/map" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2024</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link">Route helper for family trips on vehicules</i>
                                </div>
                            </a>
                        </div>
                    </div>

                <h3 className="title">Binary-Text and Text-Binary converter</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://www.omar-cruz-rmz.com/Binary" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2024</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> Binary-Text converter</i>
                                </div>
                            </a>
                        </div>
                    </div>

                <h3 className="title">E-commerce Ixvanna</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://ixvanna.vercel.app/" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2024</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> E-commerce</i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <h3 className="title">Web-Assistant</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://www.omar-cruz-rmz.com/Assistant" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2024-today</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> Terminal to facilitate web searches</i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <h3 className="title">ARM Instructions (In process)</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://www.omar-cruz-rmz.com/ARM" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2023-today</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> Computer Architecture and Organization</i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <h3 className="title">Typing game</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://www.omar-cruz-rmz.com/typing" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2023-today</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> Typing game and practice</i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <h3 className="title">Headphone Raffle</h3>
                    <div className="education-box projects">
                        <div className="education-content">
                            <a href="https://damanger.github.io/Headphones-Raffle/" target="_blank" rel='noreferrer' id="raffle-link">
                                <div className="content">
                                    <div className="year"><i className="bx bxs-calendar"></i>2023</div>
                                    <h3>Oaxaca-México</h3>
                                    <i className="fa-solid fa-link"> Raffle of a Sony headphone</i>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="education-column"></div>
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
                    <div className="education-box projects">
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
                    <div className="education-box projects">
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
                    <div className="education-box projects">
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
                    <div className="education-box projects">
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
                    <h3 className="title">Career Project</h3>
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
                </div>
            </section>

            <section className="contact hidden" id="contact">
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
                            <input type="email" id="email-input" placeholder="Email Adress" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" autoComplete="off"/>
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
                            <input id='subject' type="text" placeholder="Email Subject" required pattern="[a-zA-Z]{2,}" autoComplete="off"/>
                            <div className="subject-container">
                                <div className="subject-requirements" style={{ fontSize: '1.2rem' }}>
                                    Enter a subject.
                                </div>
                            </div>
                            <span className="focus"></span>                    
                        </div>
                    </div>

                    <div className="textarea-field">
                        <textarea id="textarea" cols="30" rows="10" placeholder="Your message goes here" required></textarea>
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
                        <a href="#"><i className="bx bx-up-arrow-alt"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Inicio;
