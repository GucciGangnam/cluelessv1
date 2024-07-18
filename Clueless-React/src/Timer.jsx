import React, { useEffect, useState, useRef } from 'react';

export const Timer = ({ timerStarted }) => {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (timerStarted) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10); // Increment time by 10 milliseconds
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [timerStarted]);

    const formatTime = (time) => {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};