import React, { FC } from 'react';
import styled from 'styled-components';
import { SlideT } from '../index';

interface PropsCSS {
    active: boolean
}

interface Props {
    slides: any[],
    activeSlide: any
}

const Dot = styled.span<PropsCSS>`
      padding: 8px;
      margin-right: 8px;
      border-radius: 50%;
      background: ${({ active }) => (active ? 'black' : 'white')};
      opacity: 0.5;
`;

const DotsCSS = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots: FC<Props> = ({ slides, activeSlide }) => (
  <DotsCSS>
    {slides.map((slide: SlideT, i: number) => (
      <Dot key={slide.id} active={activeSlide === i} />
    ))}
  </DotsCSS>
);

export default Dots;
