import React, {
  FC, useEffect, useRef,
} from 'react';

interface Props {
  slides: {
    id: string,
    url: string,
    name: string,
  }[] | undefined
}
const QuickSlider: FC<Props> = ({ slides = [] }) => {
  const interval = 100;
  const ticker = useRef<number>(0);
  const isPaused = useRef<boolean>(false);
  const sliderContainer = useRef<HTMLDivElement>(null);

  const animate = () => {
    if (!isPaused.current) {
      if (ticker.current === slides.length) {
        ticker.current = 0;
      }
      if (sliderContainer.current !== null) {
        sliderContainer.current.style.backgroundImage = `url(${slides[ticker.current].url})`;
      }
      // eslint-disable-next-line no-plusplus
      ticker.current++;
    }
  };
  const togglePause = () => {
    isPaused.current = !isPaused.current;
  };

  useEffect(() => {
    const loop = setInterval(animate, interval);
    document.addEventListener('keydown', togglePause);
    return () => {
      clearInterval(loop);
      document.removeEventListener('keydown', togglePause);
    };
  }, [slides]);

  return (<div className="sliderContainer" ref={sliderContainer} />);
};

export default QuickSlider;
