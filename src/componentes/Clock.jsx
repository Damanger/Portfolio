import React, { useState, useEffect } from 'react';
import '../assets/css/clock.css';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateClock = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(updateClock);
    }, []); // Se ejecuta solo una vez al montar el componente

    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    const hours = formatTime(time.getHours() % 12 || 12);
    const minutes = formatTime(time.getMinutes());
    const seconds = formatTime(time.getSeconds());
    const period = time.getHours() >= 12 ? 'PM' : 'AM';

    return (
        <>
            <div className="digital-clock" id='sticky-clock'>
                <div className="time">
                    <span className="hours">{hours}</span>
                    <span className="dots">:</span>
                    <span className="minutes">{minutes}</span>
                <div className="right-side">
                    <span className="period">{period}</span>
                    <span className="seconds">{seconds}</span>
                </div>
            </div>
            <div className="calendar">
                <span className="month-name">Nov</span>,
                <span className="day-name">Tus</span>
                <span className="day-number">21</span>
                <span className="year">2023</span>
            </div>
        </div>
        </>
    );
};

export default Clock;