import React, { useState, useEffect } from 'react';
import '../assets/css/clock.css';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const updateClock = setInterval(() => {
            setTime(new Date());
        }, 1000);

        const updateDate = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => {
            clearInterval(updateClock);
            clearInterval(updateDate);
        };
    }, []);

    const formatTime = (value) => (value < 10 ? `0${value}` : value);

    const hours = formatTime(time.getHours() % 12 || 12);
    const minutes = formatTime(time.getMinutes());
    const seconds = formatTime(time.getSeconds());
    const period = time.getHours() >= 12 ? 'PM' : 'AM';

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    const year = date.getFullYear();

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
                <span className="month-name">{month}</span>,
                <span className="day-name">{day}</span>
                <span className="day-number">{dayNumber}</span>
                <span className="year">{year}</span>
            </div>
        </div>
        </>
    );
};

export default Clock;