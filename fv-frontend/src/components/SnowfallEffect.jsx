import React, { useEffect, useRef, useState } from 'react';
import './css/SnowfallEffect.css';

const SnowfallEffect = () => {
    const [isSnowing, setIsSnowing] = useState(true);
    const snowContainerRef = useRef(null);

    useEffect(() => {
        const snowContent = ['&#10052', '&#10053', '&#10054'];

        const random = (num) => {
            return Math.floor(Math.random() * num);
        };

        const getRandomStyles = () => {
            const top = random(100);
            const left = random(100);
            const dur = random(10) + 10;
            const size = random(10) + 10;
            return {
                top: `-${top}%`,
                left: `${left}%`,
                fontSize: `${size}px`,
                animationDuration: `${dur}s`,
            };
        };

        const createSnow = (num) => {
            const snowContainer = snowContainerRef.current;
            for (let i = num; i > 0; i--) {
                const snow = document.createElement("div");
                snow.className = "snow";
                const styles = getRandomStyles();
                Object.keys(styles).forEach((key) => {
                    snow.style[key] = styles[key];
                });
                snow.innerHTML = snowContent[random(3)];
                snowContainer.appendChild(snow);
            }
        };

        const removeSnow = () => {
            const snowContainer = snowContainerRef.current;
            snowContainer.style.opacity = "0";
            setTimeout(() => {
                snowContainer.remove();
            }, 500);
        };

        createSnow(50); // Number of snowflakes

        const handleClick = (event) => {
            if (snowContainerRef.current.contains(event.target)) {
                setIsSnowing(false);
                removeSnow();
                window.removeEventListener('click', handleClick);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return isSnowing && <div id="snow-container" ref={snowContainerRef} />;
};

export default SnowfallEffect;
