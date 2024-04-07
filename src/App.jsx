import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect, lazy } from 'react';
import Inicio from './componentes/inicio';
import ARM from './componentes/ARM';
import Assistant from './componentes/WebAssistant';
import Error404 from './componentes/Error404';
import Typing from './componentes/Typing';
import Clock from './componentes/Clock';
import Binary from './componentes/binary';
import Map from './componentes/Map';
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components';
const Cargando = lazy(() => import('./componentes/Cargando'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Cargando url="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Ardilla.webp" />
      ) : (
        <>
          <Clock />
          <ChatBot
          steps={[
            {
              id: '1',
              message: 'Hello there! What´s your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hello {previousValue}, Nice to meet you!',
              trigger: 'faq',
            },
            {
              id: 'faq',
              message: 'How can i help you today?',
              trigger: 'menu',
            },
            {
              id: 'menu',
              options: [
                { value: 1, label: 'What services do you offer?', trigger: 'services' },
                { value: 2, label: 'Can you provide examples of your previous work?', trigger: 'previous' },
                { value: 3, label: 'How do you approach a new project?', trigger: 'new' },
                { value: 4, label: 'What is your design/development process like?', trigger: 'process' },
                { value: 5, label: 'Do you work alone or with a team?', trigger: 'work' },
                { value: 6, label: 'What technologies/frameworks/languages are you proficient in?', trigger: 'technologies' },
                { value: 7, label: 'What sets you apart from other designers/developers?', trigger: 'apart' },
                { value: 8, label: 'How do you handle feedback and revisions?', trigger: 'feedback' },
                { value: 9, label: 'Do you offer ongoing support and maintenance?', trigger: 'support' },
                { value: 10, label: 'How do you handle project contracts and payments?', trigger: 'handle' },
                { value: 11, label: 'Can you accommodate rush projects or tight deadlines?', trigger: 'deadlines' },
                { value: 12, label: 'Can you customize your services to fit my specific needs?', trigger: 'customize' },
                { value: 13, label: 'How do you stay updated with industry trends and best practices?', trigger: 'updated' },
                { value: 14, label: 'Do you have any certifications or awards?', trigger: 'certifications' },
                { value: 16, label: 'How can I get in touch with you to discuss a potential project?', trigger: 'contact' }
              ],
            },
            {
              id: 'services',
              message: 'I specialize in front-end web design and mobile development using React, Angular, Android Studio, Swift, and Flutter.',
              trigger: 'menu',
            },
            {
              id: 'previous',
              message: 'Yes, you can find examples on my portfolio website (Projects).',
              trigger: 'menu',
            },
            {
              id: 'new',
              message: "I start by understanding the client's requirements, conducting research, and then creating a detailed project plan.",
              trigger: 'menu',
            },
            {
              id: 'process',
              message: 'My process is iterative, beginning with wireframing and prototyping, followed by development and testing.',
              trigger: 'menu',
            },
            {
              id: 'work',
              message: 'I can work independently or collaborate with a team, depending on the project.',
              trigger: 'menu',
            },
            {
              id: 'technologies',
              message: "I'm proficient in React, Angular, Android Studio, Swift, Flutter, HTML, CSS, and JavaScript.",
              trigger: 'menu',
            },
            {
              id: 'apart',
              message: 'I blend creativity with technical expertise to deliver innovative solutions.',
              trigger: 'menu',
            },
            {
              id: 'feedback',
              message: 'I welcome feedback and handle revisions promptly and effectively.',
              trigger: 'menu',
            },
            {
              id: 'support',
              message: 'Yes, I provide ongoing support to ensure the success of projects.',
              trigger: 'menu',
            },
            {
              id: 'handle',
              message: 'I use clear contracts and milestone-based payments.',
              trigger: 'menu',
            },
            {
              id: 'deadlines',
              message: 'Yes, I prioritize efficient project management to meet deadlines.',
              trigger: 'menu',
            },
            {
              id: 'customize',
              message: 'Absolutely, I tailor my services to meet your specific requirements.',
              trigger: 'menu',
            },
            {
              id: 'updated',
              message: 'I stay updated through continuous learning and engagement with the developer community.',
              trigger: 'menu',
            },
            {
              id: 'certifications',
              message: "Yes, I'm certified in front-end development by Oracle-Alura and hold over 50 certifications in areas such as Python, web development, networking, remote work, Scrum, and more.",
              trigger: 'menu',
            },
            {
              id: 'contact',
              message: 'You can reach me via email at omar.cruzr97@gmail.com, or phone at +529514084765.',
              trigger: 'menu',
            },
          ]}
          floating={true}
          botAvatar="https://raw.githubusercontent.com/Damanger/Portfolio/main/public/Ardilla.webp"
          userAvatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Blank_user.svg/1707px-Blank_user.svg.png"
          floatingIcon={<div className="custom-floating-icon" />}
        />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/ARM' element={<ARM />} />
            <Route path='/Assistant' element={<Assistant />} />
            <Route path='/typing' element={<Typing />} />
            <Route path='/binary' element={<Binary />} />
            <Route path='/map' element={(
              <>
                <MapResources />
                <Map />
              </>
            )} />
            <Route path="*" element={<><Error404 /><Navigate to="/not-found" replace /></>} />
          </Routes>
        </>
      )}
    </Router>
  );
}

// Componente que carga los recursos solo para la ruta /map
const MapResources = () => (
  <>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
  </>
);

export default App;
