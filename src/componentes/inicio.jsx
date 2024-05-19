import React, { useEffect, useState } from 'react';
import '../assets/css/inicio.css';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import 'font-awesome/css/font-awesome.min.css';
import { faSearch, faBars, faCalendar  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { BsArrowUp } from 'react-icons/bs';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

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

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

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
        <>
            <header className="header">
                <Link to="/" className="logo" rel='noreferrer' aria-label="Main page" onClick={scrollToTop}>
                    <LazyLoad threshold={0.95}>
                        <img className='logo-img' fetchpriority="high" src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/omar.webp" alt="Omar Cruz" style={{ width: '15rem', height: 'auto' }} />
                    </LazyLoad>
                </Link>
                <div id="menu-icon">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <nav className="navbar">
                    <input type="text" id="search-input" autoComplete='off' name="text" className="input" placeholder={placeholders[placeholderN]} value={searchQuery} onChange={handleSearchInputChange} onKeyDown={handleKeyPress}/>
                    <button className='magnifying' aria-label="Magnifying" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
                    <a href="#home" className="active cipher" rel='noreferrer' aria-label="Home">Home</a>
                    <a href="#about" className="cipher" rel='noreferrer' aria-label="About">About</a>
                    <a href="#journey" className="cipher" rel='noreferrer' aria-label="Journey">Journey</a>
                    <a href="#skills" className="cipher" rel='noreferrer' aria-label="Skills">Skills</a>
                    <a href="#projects" className="cipher" rel='noreferrer' aria-label="Projects">Projects</a>
                    <a href="#contact" className="cipher" rel='noreferrer' aria-label="Contact">Contact</a>
                    <span className="active-nav"></span>
                </nav>
                <LazyLoad threshold={0.95}>
                    <img className='views' src="https://hitwebcounter.com/counter/counter.php?page=9944997&style=0006&nbdigits=4&type=page&initCount=0" fetchpriority="high" alt="Visit counter For Websites"/>
                </LazyLoad>
            </header>

            <div className="scroll-watcher"></div>

            <section className="home hidden" id="home">
                <div className="home-content">
                    <h1>Hello, I'm <span> Omar Cruz</span></h1>
                    <div className="text-animate">
                        <h2>Full-Stack Developer</h2>
                    </div>
                    <p>I'm a Full-Stack Developer based in Oaxaca, México.</p><p>🚀 Looking to bring your web ideas to life? 🌐💡</p>
                    
                    <div className="btn-box">
                        <a href="https://drive.google.com/uc?export=download&id=1S97fyfYCfp-zmXnNoZGaJjFg1PL3HX8c" className="btn" download="Omar-A-Cruz-Ramirez-CV.pdf" aria-label="CV">CV<i className="fas fa-cloud-download-alt"></i></a>
                        <a href="#contact" className="btn" aria-label="Let's talk">Let's talk.</a>
                    </div>
                    <div className="wrapper">
                        <div className="icon whats">
                            <a href="https://wa.me/5219514084765?text=Buen%20d%C3%ADa,%20quise%20contactarlo%20para%20desarrollar%20un%20servicio%20web." target="_blank" rel='noreferrer' aria-label="Whatsapp">
                                <span><FontAwesomeIcon icon={faWhatsapp} /></span>
                            </a>
                        </div>                
                        <div className="icon linked">
                            <div className="tooltip">
                                LinkedIn
                            </div>
                            <a href="https://www.linkedin.com/in/omar-cruzr97" target="_blank" rel='noreferrer' aria-label="LinkedIn">
                                <span><FontAwesomeIcon icon={faLinkedin} /></span>
                            </a>
                        </div>
                        <div className="icon git">
                            <div className="tooltip">
                                Github
                            </div>
                            <a href="https://github.com/Damanger" target="_blank" rel='noreferrer' aria-label="Github">
                                <span><FontAwesomeIcon icon={faGithub} /></span>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="home-imgHover"><LazyLoad threshold={0.95}>
                    <img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/yoMemoji.webp" fetchpriority="high" alt="selfie" style={{width: '40rem', height: '45rem', objectFit: 'cover', objectPosition: 'center'}}/></LazyLoad>
                </div>
                </section>

            <section className="about hidden" id="about">
                <h2 className="heading">About <span>Me</span></h2>
                <div className="about-img">
                    <LazyLoad threshold={0.95}>
                        <img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/yo.webp" alt="selfie" style={{width : '25rem', height : '25rem'}}/>
                    </LazyLoad>
                    <span className="circle-spin"></span>
                </div>
                <div className="about-content">
                    <h3>Hello and welcome to my website! My name is Omar Cruz and I would like to share a bit about who I am as a person.</h3>
                    <p>I am a responsible individual with a strong sense of initiative and a proactive mindset. Taking ownership of my responsibilities comes naturally to me, as I believe in delivering high-quality results and meeting deadlines consistently. Furthermore, I possess strong leadership qualities, which allow me to guide and inspire others towards achieving common goals. I thrive in collaborative environments, valuing teamwork and actively contributing to the success of the group.</p>
                </div>
                <div className="certificados">
                    <a className="certificado-link" href="https://app.aluracursos.com/program/certificate/3b86f076-e7b1-420b-b3ac-f08d03cbf4d7" target="_blank" rel='noreferrer' aria-label="See certificate">
                        <LazyLoad threshold={0.95}>
                            <img alt="Oracle + Alura LATAM certificate" src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Front-End.webp" style={{width : 'auto', height : 'auto'}}/>
                        </LazyLoad>
                    </a>
                    <a className="certificado-link" href='https://app.aluracursos.com/user/omar-cruzr97/fullCertificate/78801b3b7069693e6a6c314528f4b87f' target='_blank' rel='noreferrer' aria-label="Jr. Developer certification">
                        <LazyLoad threshold={0.95}>
                            <img alt="Jr. Developer" src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Jr.webp" style={{width : 'auto', height : 'auto'}}/>
                        </LazyLoad>
                    </a>
                    <a className="certificado-link" href='https://app.aluracursos.com/degree/certificate/1fa2dc74-672d-4a1c-bd5b-e50077a537b9' target='_blank' rel='noreferrer' aria-label="React certification">
                        <LazyLoad threshold={0.95}>
                            <img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/React.webp" alt="React" style={{width : 'auto', height : 'auto'}}/>
                        </LazyLoad>
                    </a>
                    <a className="certificado-link" href='https://www.linkedin.com/in/omar-cruzr97/' target='_blank' rel='noreferrer' aria-label="More certifications">
                        <LazyLoad threshold={0.95}>
                            <img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/plus.webp" alt="More certificates" style={{width : 'auto', height : 'auto'}}/>
                        </LazyLoad>
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
                                    <a href='http://www.escolta.io/' target='_blank' rel='noreferrer' aria-label="Escolta.io">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2023 - Today</div>
                                        <h3>Private security company , San Francisco Ca. USA</h3>
                                        <p>Front-End developer, UI design</p>
                                    </a>
                                </div>

                                <div className="content">
                                    <a href='https://dropet.io/' target='_blank' rel='noreferrer' aria-label="Dropet.io">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2023</div>
                                        <h3>Automated deployments, San Francisco Ca. USA</h3>
                                        <p>Front-End developer, UI design</p>
                                    </a>
                                </div>

                                <div className="content">
                                    <a href='http://lapi.fi-p.unam.mx/' target='_blank' rel='noreferrer' aria-label="LaPI">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2023</div>
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
                                    <a href='https://www.aluracursos.com/cursos-online-front-end' target='_blank' rel='noreferrer' aria-label="ONE - Oracle">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2023 - Today</div>
                                        <h3>ONE - Oracle & Alura</h3>
                                        <p>In this year, I enrolled in a course called Oracle Next Education (ONE), offered by Oracle and Alura. I am currently part of Group 5 and still actively pursuing the program.</p>
                                    </a>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <a href='https://www.utm.mx/investigacion.html#ic' target='_blank' rel='noreferrer' aria-label="UTM">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2020 - Today</div>
                                        <h3>Computer Engineering - Universidad Tecnológica de la Mixteca</h3>
                                        <p>I am currently pursuing a Bachelor's degree in Computer Engineering and I am in my 7th semester out of 10.</p>
                                    </a>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <a href='https://www.harmonhall.com/' target='_blank' rel='noreferrer' aria-label="English">
                                        <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2009  - 2013</div>
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
                                    <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2022 - Today</div>
                                    <h3>Web Developer - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying HTML, CSS, JavaScript, and TypeScript since the fifth semester, utilizing frameworks such as Angular. I have already created several web pages as part of my projects.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2021 - Today</div>
                                    <h3>SQL - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying SQL programming language since the fourth semester and have gained practical experience working with databases in various projects.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2021  - Today</div>
                                    <h3>Java programming - Universidad Tecnológica de la Mixteca</h3>
                                    <p>Since the third semester, I have been studying the Java programming language and have already completed several projects, including a compiler and complex regex search.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2020 - Today</div>
                                    <h3>Python programming - Universidad Tecnológica de la Mixteca</h3>
                                    <p>I have been studying the Python programming language since the first semester and have already completed several projects, including a compiled Spanish version of Python.</p>
                                </div>
                            </div>

                            <div className="education-content">
                                <div className="content">
                                    <div className="year"><FontAwesomeIcon icon={faCalendar} /> 2020  - Today</div>
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
                                    <div align="center" width="96">
                                        <iframe src="https://lottie.host/embed/a18525b5-d568-455d-a893-f67e676831dc/GToZ6J6m46.json" title="Angular" width="60" height="60"></iframe>
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="60" height="60" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://cdn.worldvectorlogo.com/logos/html-1.svg" alt="HTML" width="40" height="65" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://cdn.worldvectorlogo.com/logos/css-3.svg" alt="CSS" width="40" height="65" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="JavaScript" width="65" height="65" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="Typescript" width="65" height="65" />
                                    </div>
                                    <div align="center"  width="96">
                                        <img src="https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg" width="48" height="48" alt="bootstrap" />
                                    </div>
                                    <div align="center" width="96">
                                        <iframe src="https://lottie.host/embed/a13aec4b-4d8d-4e38-b9ee-2e26374877de/7A9VNJ5qB0.json" title="Figma" width="60" height="60"></iframe> 
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/github-icon.svg" alt="Github" width="60" height="60" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/mysql-icon.svg" width="48" height="48" alt="MySQL" style={{scale:'120%'}} />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/python-icon.svg" width="48" height="65" alt="python" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/java-icon.svg" width="48" height="65" alt="Java" />
                                    </div>
                                    <div align="center" width="96">
                                        <img src="https://techstack-generator.vercel.app/swift-icon.svg" alt="Swift" width="60" height="60" />
                                    </div>
                                    <div align="center" width="96">
                                        <iframe src="https://lottie.host/embed/8bca7b08-deb9-4517-b01c-5a428ca74e8c/DWDw0iuYSN.json" title="SQL" width="60" height="60"></iframe>
                                    </div>
                                    <div align="center" width="96">
                                        <iframe src="https://lottie.host/embed/9ca31519-88da-4dd5-8a51-9de5eb2af7bc/ot2ogtDE3M.json" title="Apple" width="60" height="60" style={{scale:'120%'}}></iframe>
                                    </div>
                                    <div align="center" width="96">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 136" width="48" height="48"><path d="M107.775 106.801a.005.005 0 01-.003-.005c-.958-1.08-1.414-3.085-1.905-5.22-.489-2.134-1.037-4.435-2.789-5.926-.003-.004-.008-.006-.01-.01a6.99 6.99 0 00-2.151-1.296c2.434-7.22 1.48-14.413-.979-20.91-3.016-7.976-8.283-14.925-12.305-19.678-4.503-5.68-8.906-11.07-8.819-19.035.134-12.153 1.336-34.69-20.05-34.72a33.501 33.501 0 00-2.723.11c-23.9 1.923-17.56 27.174-17.915 35.628-.438 6.184-1.69 11.057-5.944 17.101-4.995 5.94-12.03 15.556-15.362 25.567-1.572 4.723-2.32 9.538-1.63 14.096-.216.194-.42.398-.619.606-1.466 1.567-2.55 3.464-3.757 4.741-1.129 1.127-2.735 1.554-4.503 2.187-1.767.634-3.707 1.57-4.884 3.828 0 0 0 .002-.002.002-.002.003-.003.008-.006.011-.554 1.034-.734 2.15-.734 3.281 0 1.047.154 2.107.311 3.128.325 2.124.655 4.133.217 5.494-1.397 3.824-1.578 6.467-.593 8.386.988 1.923 3.016 2.77 5.31 3.25 4.585.956 10.796.72 15.69 3.314l.421-.794-.417.795c5.24 2.74 10.552 3.713 14.79 2.745 3.073-.7 5.567-2.53 6.848-5.347 3.315-.016 6.952-1.42 12.78-1.74 3.952-.319 8.89 1.404 14.57 1.088.148.616.363 1.21.657 1.772l.01.016c2.201 4.403 6.291 6.417 10.652 6.073 4.365-.344 9.006-2.918 12.76-7.382l-.689-.578.693.571c3.577-4.337 9.512-6.134 13.45-8.508 1.967-1.187 3.563-2.673 3.688-4.832.122-2.157-1.145-4.575-4.058-7.809" fill="#202020"/><path d="M110.037 114.508c-.077 1.332-1.04 2.322-2.823 3.395-3.56 2.147-9.87 4.016-13.9 8.897-3.5 4.165-7.767 6.452-11.525 6.749-3.758.296-7-1.263-8.913-5.1l-.002-.007-.004-.01c-1.188-2.257-.694-5.816.305-9.571 1-3.755 2.436-7.612 2.627-10.745v-.01c.202-4.014.428-7.521 1.102-10.227.675-2.707 1.737-4.538 3.62-5.568.088-.047.174-.093.261-.136.213 3.477 1.936 7.025 4.978 7.79 3.33.879 8.128-1.978 10.155-4.308.405-.016.8-.037 1.183-.046 1.78-.043 3.269.06 4.793 1.392l.005.004.005.004c1.172.992 1.728 2.867 2.212 4.966.483 2.1.867 4.387 2.317 6.018l.001.005c2.785 3.088 3.68 5.175 3.603 6.508m-67.665 9.844v.021c-.323 4.22-2.703 6.517-6.358 7.352-3.652.835-8.606.003-13.552-2.583l-.005-.002c-5.473-2.899-11.983-2.61-16.16-3.483-2.088-.436-3.452-1.092-4.077-2.31-.624-1.22-.639-3.346.69-6.97l.006-.017.005-.016c.658-2.028.171-4.247-.148-6.33-.319-2.08-.475-3.977.236-5.296l.007-.013c.91-1.755 2.246-2.383 3.902-2.976 1.66-.595 3.624-1.062 5.175-2.618l.01-.009.008-.007c1.434-1.514 2.512-3.412 3.773-4.758 1.064-1.137 2.13-1.89 3.734-1.9a6.125 6.125 0 01.95.075c2.131.321 3.988 1.81 5.778 4.237l5.167 9.417.002.005.003.003c1.374 2.871 4.278 6.03 6.738 9.25 2.461 3.22 4.364 6.453 4.116 8.928m25.769-87.787c-.415-.813-1.263-1.586-2.705-2.178l-.003-.001-.005-.002c-3-1.285-4.302-1.376-5.976-2.465-2.726-1.752-4.978-2.366-6.85-2.358a8.09 8.09 0 00-2.64.448c-2.28.785-3.794 2.42-4.742 3.319l-.002.002-.001.003c-.187.177-.427.338-1.008.764-.585.427-1.463 1.07-2.725 2.018-1.122.84-1.487 1.937-1.098 3.22.386 1.283 1.624 2.763 3.887 4.043l.003.003.005.002c1.404.825 2.364 1.938 3.465 2.823.551.442 1.13.837 1.828 1.135.697.298 1.512.5 2.531.56 2.392.139 4.154-.58 5.708-1.47 1.558-.888 2.877-1.975 4.391-2.466l.003-.002.003-.001c3.103-.97 5.316-2.921 6.008-4.776.347-.928.337-1.808-.077-2.621" fill="#FFCD00"/><path d="M60.269 41.145c-2.468 1.287-5.352 2.847-8.42 2.847-3.066 0-5.488-1.417-7.23-2.798-.872-.69-1.58-1.376-2.112-1.875-.925-.73-.815-1.755-.435-1.725.638.08.734.919 1.135 1.294.543.508 1.224 1.166 2.047 1.82 1.648 1.305 3.845 2.575 6.596 2.575 2.746 0 5.95-1.612 7.908-2.71 1.108-.621 2.519-1.736 3.67-2.581.88-.646.849-1.425 1.576-1.34.727.085.189.862-.83 1.75-1.018.889-2.611 2.068-3.905 2.743" fill="#202020"/><path d="M98.066 93.818a16.194 16.194 0 00-1.1-.002c.848-2.676-1.027-4.651-6.024-6.911-5.18-2.278-9.31-2.053-10.007 2.57-.044.243-.08.49-.107.74a7.885 7.885 0 00-1.168.519c-2.432 1.332-3.76 3.747-4.5 6.71-.737 2.96-.95 6.539-1.152 10.562v.003c-.125 2.022-.958 4.758-1.8 7.656-8.488 6.055-20.267 8.678-30.27 1.85-.677-1.071-1.455-2.133-2.255-3.181-.51-.67-1.037-1.333-1.557-1.99 1.025.002 1.898-.167 2.604-.486.877-.4 1.492-1.037 1.798-1.857.61-1.64-.003-3.954-1.955-6.597-1.952-2.642-5.258-5.623-10.116-8.603V94.8c-3.57-2.221-5.564-4.942-6.499-7.896-.935-2.956-.805-6.152-.083-9.306 1.382-6.056 4.933-11.946 7.2-15.642.608-.448.217.834-2.296 5.499-2.25 4.264-6.459 14.105-.697 21.788.154-5.467 1.46-11.042 3.652-16.258 3.192-7.236 9.87-19.787 10.4-29.79.275.199 1.214.833 1.632 1.072h.003c1.225.722 2.145 1.777 3.336 2.735 1.195.959 2.686 1.788 4.94 1.919.216.012.428.019.634.019 2.324 0 4.135-.758 5.644-1.621 1.64-.938 2.95-1.976 4.192-2.38.001-.002.003-.002.004-.002 2.625-.82 4.71-2.272 5.896-3.964 2.04 8.036 6.78 19.644 9.828 25.308 1.62 3.004 4.843 9.39 6.235 17.083.882-.027 1.855.1 2.894.368 3.641-9.44-3.087-19.604-6.164-22.435-1.242-1.206-1.302-1.746-.685-1.721 3.336 2.953 7.72 8.888 9.313 15.589.727 3.056.882 6.269.103 9.44.38.157.768.329 1.161.516 5.844 2.845 8.004 5.32 6.966 8.697M68.415 27.307c.013 1.592-.262 2.948-.866 4.332-.344.79-.74 1.452-1.216 2.026a9.674 9.674 0 00-.5-.222 40.54 40.54 0 00-1.61-.649c-.478-.18-.85-.302-1.233-.435.278-.336.825-.732 1.03-1.229a6.5 6.5 0 00.488-2.355c0-.035.011-.065.011-.106a6.519 6.519 0 00-.337-2.283c-.256-.769-.58-1.32-1.052-1.78-.47-.46-.942-.668-1.507-.687-.027-.002-.052-.002-.079-.002-.53.002-.99.185-1.467.583-.5.418-.872.953-1.18 1.698-.309.745-.46 1.483-.49 2.361-.005.034-.005.064-.005.1-.01.482.021.924.095 1.353-1.086-.54-2.475-.936-3.435-1.165a11.791 11.791 0 01-.096-1.29v-.122c-.017-1.588.243-2.95.854-4.332.611-1.384 1.366-2.379 2.43-3.188 1.065-.808 2.112-1.179 3.351-1.192h.058c1.212 0 2.25.357 3.314 1.13 1.081.785 1.861 1.766 2.49 3.14.615 1.338.911 2.646.941 4.197 0 .041 0 .076.011.117m-18.319 1.586a9.425 9.425 0 00-.467.148c-.868.3-1.557.63-2.223 1.07a6.01 6.01 0 00.023-1.45c-.004-.029-.004-.053-.004-.08a6.336 6.336 0 00-.461-1.861c-.261-.61-.553-1.041-.936-1.373-.347-.3-.676-.44-1.038-.436-.037 0-.075.002-.112.005-.407.035-.745.233-1.066.623-.319.388-.528.871-.68 1.512a6.082 6.082 0 00-.128 1.989c0 .029.007.052.007.08.069.7.21 1.28.459 1.867.255.605.552 1.036.936 1.366.065.056.128.106.19.15-.397.309-.664.526-.993.767-.21.152-.459.335-.749.55-.633-.593-1.127-1.337-1.559-2.322-.512-1.16-.785-2.324-.867-3.697v-.01c-.076-1.373.059-2.555.436-3.776.378-1.221.883-2.105 1.617-2.83.733-.729 1.471-1.095 2.362-1.14.069-.004.137-.006.205-.006.806.002 1.526.27 2.271.865.807.646 1.418 1.471 1.93 2.634.513 1.163.785 2.326.861 3.7v.01c.037.576.032 1.12-.014 1.645" fill="#FFF"/><path d="M54.145 32.178c.102.328.63.273.935.43.268.139.483.44.784.449.287.008.735-.1.772-.385.05-.377-.5-.615-.854-.753-.455-.178-1.039-.268-1.466-.03-.098.055-.205.182-.17.289m-3.12 0c-.102.328-.63.273-.936.43-.267.139-.482.44-.784.449-.287.008-.734-.1-.77-.385-.05-.377.5-.615.853-.753.455-.178 1.038-.268 1.466-.03.097.055.204.182.171.289" fill="#202020"/></svg>
                                    </div>
                                    <div align="center" width="96">
                                        <iframe src="https://lottie.host/embed/e869c1d4-1c65-4b08-b3b6-c5a561587f53/1e7yjhFTdd.json" title="Windows" width="60" height="60" style={{scale:'300%'}}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="education hidden" id="projects">
                <h2 className="heading">My <span>Projects</span></h2>

                <div className="wrapperP">
                    <div className="grid1">
                        <a href="https://www.omar-cruz-rmz.com/map" target="_blank" rel='noreferrer' aria-label="Route planning"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/maps.webp" alt="Maps" /></a>
                    </div>

                    <div className="grid2">
                        <a href="https://www.omar-cruz-rmz.com/Binary" target="_blank" rel='noreferrer' aria-label="Binary to text"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/binary.webp" alt="Binary-Text" /></a>
                    </div>

                    <div className="grid3">
                        <a href="https://ixvanna.vercel.app/" target="_blank" rel='noreferrer' aria-label="E-commerce"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/ixvanna.webp" alt="Ixvanna" /></a>
                    </div>

                    <div className="grid4">
                        <a href="https://sql-converter-zeta.vercel.app/" target="_blank" rel='noreferrer' aria-label="Web - Browser"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/sql.webp" alt="SQL Converter" /></a>
                    </div>
                    
                    <div className="grid5">
                        <a href="https://qr-generator-and-url-shortener.vercel.app/" target="_blank" rel='noreferrer' aria-label="QR generator & URL Shortener"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/QR-URL.webp" alt="QR-URL Generator" /></a>
                    </div>

                    <div className="grid6">
                        <a href="https://squirrel-trello.vercel.app/" target="_blank" rel='noreferrer' aria-label="Raffle"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Trello.webp" alt="SquirrelTrello" /></a>
                    </div>

                    <div className="grid7">
                        <a href="https://www.omar-cruz-rmz.com/typing" target="_blank" rel='noreferrer' aria-label="Typing game"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/typing.webp" alt="Typing game" /></a>
                    </div>
                    
                    <div className="grid8">
                        <a href="https://www.omar-cruz-rmz.com/Assistant" target="_blank" rel='noreferrer' aria-label="Web assistant"><img src="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/assistant.webp" alt="Assistant" /></a>
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
                        <button type="submit" className="btn" aria-label="Submit">Submit</button>
                    </div>
                </form>
            </section>

            <footer>
                <div className="footer">
                    <div className="footer-text">
                        <p>Copyright &copy; 2023 by Omar A. Cruz Ramírez All Rights Reserved. </p>
                    </div>
                    <div className="footer-iconTop">
                        <Link to='/' rel='noreferrer' aria-label="Main Page" onClick={scrollToTop}>
                            <BsArrowUp />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Inicio;
