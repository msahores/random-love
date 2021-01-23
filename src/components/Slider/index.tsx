import React, {
  FC, useState, useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

const getWidth = () => window.innerWidth;
interface Props {
  slides: SlideT[],
  autoPlay?: number,
  dots?: boolean,
}

export interface SlideT {
  id: string,
  url: string,
}

type RefT = undefined | (()=> void)

const Slider:FC<Props> = ({ slides = [], autoPlay, dots = true }) => {
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [activeSlide, setActiveSlide] = useState(0);
  const [translate, setTranslate] = useState(getWidth());
  const [transition, setTransition] = useState(0.45);
  const [stateSlides, setStateSlides] = useState([lastSlide, firstSlide, secondSlide]);

  const autoPlayRef: React.MutableRefObject<RefT> = useRef();
  const transitionRef: React.MutableRefObject<RefT> = useRef();
  const resizeRef: React.MutableRefObject<RefT> = useRef();
  const sliderRef: any = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const slider: any = sliderRef.current;

    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };

    const smooth = (e: any) => {
      if (e.target.className.includes(SliderContent.styledComponentId)) {
        if (transitionRef.current) transitionRef.current();
      }
    };

    const resize = () => {
      if (resizeRef.current) resizeRef.current();
    };

    let transitionEnd: any;
    if (slider) {
      transitionEnd = slider.addEventListener('transitionend', smooth);
    }
    const onResize: any = window.addEventListener('resize', resize);

    let interval: any = null;

    if (autoPlay) {
      interval = setInterval(play, autoPlay * 1000);
    }
    return () => {
      slider.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);

      if (autoPlay) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (transition === 0) {
      setTransition(0.45);
    }
  }, [transition]);

  const smoothTransition = () => {
    let preSlides = [];

    if (activeSlide === slides.length - 1) preSlides = [slides[slides.length - 2], lastSlide, firstSlide];
    else if (activeSlide === 0) preSlides = [lastSlide, firstSlide, secondSlide];
    else preSlides = slides.slice(activeSlide - 1, activeSlide + 2);

    setStateSlides(preSlides);
    setTranslate(getWidth());
    setTransition(0);
  };

  const nextSlide = () => {
    setActiveSlide(prevActiveSlide => (prevActiveSlide === slides.length - 1 ? 0 : prevActiveSlide + 1));
    setTranslate(prevTranslate => prevTranslate + getWidth());
  };

  const handleResize = () => {
    setTranslate(getWidth());
    setTransition(0);
  };

  const prevSlide = () => {
    setTranslate(0);
    setActiveSlide(prevActiveSlide => (prevActiveSlide === 0 ? slides.length - 1 : prevActiveSlide - 1));
  };

  return (
    <Container ref={sliderRef}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * stateSlides.length}
      >
        {stateSlides.map(slide => (
          <Slide key={slide.id} content={slide.url} width={getWidth()} />
        ))}
      </SliderContent>
      {!autoPlay && (
      <>
        <Arrow direction="left" handleClick={prevSlide} />
        <Arrow direction="right" handleClick={nextSlide} />
      </>
      )}
      {dots && <Dots slides={slides} activeSlide={activeSlide} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

export default Slider;
