import React, {
  FC, useState, useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

interface Props {
  slides: SlideT[],
  autoPlay?: number,
}

export interface SlideT {
  id: string,
  url: string,
}

const Slider:FC<Props> = ({ slides = [], autoPlay }) => {
  const getWidth = () => window.innerWidth;
  const [translate, setTranslate] = useState(0);
  const [transition] = useState(0.45);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    if (autoPlay) {
      const interval = setInterval(play, autoPlay * 1000);
      return () => clearInterval(interval);
    }
    return () => null;
  }, [autoPlay]);

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      setTranslate(0);
      setActiveSlide(0);
    } else {
      setActiveSlide((prevactiveSlide) => prevactiveSlide + 1);
      setTranslate((prevTranslate) => prevTranslate + getWidth());
    }
  };

  const autoPlayRef = useRef(nextSlide);

  const prevSlide = () => {
    if (activeSlide === 0) {
      setTranslate((slides.length - 1) * getWidth());
      setActiveSlide(slides.length - 1);
    } else {
      setActiveSlide((prevactiveSlide) => prevactiveSlide - 1);
      setTranslate((prevTranslate) => prevTranslate - getWidth());
    }
  };

  return (
    <Container>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * slides.length}
      >
        {slides.map(slide => (
          <Slide key={slide.id} content={slide.url} />
        ))}
      </SliderContent>
      {!autoPlay && (
      <>
        <Arrow direction="left" handleClick={prevSlide} />
        <Arrow direction="right" handleClick={nextSlide} />
      </>
      )}
      <Dots slides={slides} activeSlide={activeSlide} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`;

export default Slider;
