// animations.jsx
import { keyframes } from '@emotion/css';
import { useState, useEffect } from 'react';

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;


const AnimatedLetters = ({ text }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const letterArray = text.split('').map((letter, index) => ({
      letter,
      key: `${letter}-${index}`,
      animationDelay: `${index * 0.1}s`,
    }));
    setLetters(letterArray);
  }, [text]);

  return (
    <h1 className='AnimatedLetters'>
      {letters.map(({ letter, key, animationDelay }) => (
        <span key={key} style={{ animationDelay }}>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
};

export { slideInFromTop, slideInFromBottom, AnimatedLetters };