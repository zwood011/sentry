import React from 'react';
import { keyframes, css } from '@emotion/css';
import { useState, useEffect } from 'react';

const HeaderFadeIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const CardHandlerFadeIn = keyframes`
  0% {
    transform: translateY(15%);
  }
  100% {
    transform: translateY(0);
  }
`;

const headerAnimation = css`animation: ${HeaderFadeIn} 0.5s ease;`;
const mainAnimation = css`animation: ${CardHandlerFadeIn} 0.8s ease;`;

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
        <span key={key} style={{ animationDelay }} className='AnimatedLetter'>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
};

const AnimatedLoader = ({ text }) => {
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
    <h1 className='AnimatedLoader'>
      {letters.map(({ letter, key, animationDelay }) => (
        <span key={key} style={{ animationDelay }} className='AnimatedLoad'>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
};


export { AnimatedLetters, AnimatedLoader, headerAnimation, mainAnimation };