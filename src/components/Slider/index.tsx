import React, { FC, useState, useEffect, useRef } from 'react';
import SliderContent from './Dots/SliderContent';
import { Container } from './index.styles';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

interface Props {
  slides: string[],
  autoPlay?: number,
}

const Slider:FC<Props> = ({ slides = [], autoPlay } ) => {

  const getWidth = () => window.innerWidth;
  const [ translate, setTranslate ] = useState(0);
  const [ transition ] = useState(0.45);
  const [ activeSlide, setActiveSlide ] = useState(0);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    }
    let interval: NodeJS.Timeout;
    if(autoPlay){
      interval = setInterval(play, autoPlay * 1000)
    }
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if(autoPlay){
      autoPlayRef.current = nextSlide;
    }
  });

  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      setTranslate(0);
      setActiveSlide(0);
    } else {
    setActiveSlide(prevactiveSlide => prevactiveSlide + 1)
    setTranslate(prevTranslate => prevTranslate + getWidth());
    }
  }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const autoPlayRef = autoPlay ? useRef(nextSlide) : useRef(()=>null);

  const prevSlide = () => {
    if (activeSlide === 0) {
      setTranslate((slides.length - 1) * getWidth());
      setActiveSlide(slides.length - 1)
    } else {
      setActiveSlide(prevactiveSlide => prevactiveSlide - 1);
      setTranslate(prevTranslate => prevTranslate - getWidth());
    }
  }

  return (
    <Container>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * slides.length}>
          {slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>
      {!autoPlay && <>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      </>}
      <Dots slides={slides} activeSlide={activeSlide} />
    </Container>
  )}

export default Slider;
