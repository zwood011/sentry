import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from 'react';

const BGParticles = () => {
    const [init, setInit] = useState(false);
    const [enabled, setEnabled] = useState(true); // Use state for enabled
    const particleCountRef = useRef(60);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(() => ({
        fpsLimit: 144,
        interactivity: {
            events: {
                onClick: {
                    enable: enabled, // Use the state value
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "light",
                },
            },
            modes: {
                push: {
                    quantity: 3,
                },
            },
        },
        particles: {
            color: {
                value: "#fcb6b6",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.15,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: particleCountRef.current,
            },
            opacity: {
                value: 0.4,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), [enabled]);

    // Global click handler
    const handleClick = () => {
        if (particleCountRef.current < 130) {
            particleCountRef.current += 3;
        } else {
            setEnabled(false);
        }
        console.log(particleCountRef.current);
        console.log(enabled);
    };

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        }; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    className="particles"
                    options={options}
                />
            )}
        </>
    );
};

export default BGParticles;