import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from 'react';

const BGParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        const noscriptElement = document.querySelector('noscript');
        if (noscriptElement) {
            noscriptElement.remove();
        }
    }, []);

    const options = useMemo(() => ({
        fpsLimit: 144,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "light",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
            },
        },
        particles: {
            color: {
                value: "#A9A9A9",
            },
            links: {
                color: "#d3d3d3",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 55,
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
    }), []);
    return (
        <>
            {init && <Particles id="tsparticles" className="particles" options={options} />}
        </>
    )
};

export default BGParticles;