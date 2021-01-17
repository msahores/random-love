import React, { FC }  from 'react';
import styled from 'styled-components';

interface PropsCSS {
    active: boolean
}

interface Props {
    slides: any[],
    activeSlide: any
}

const Dot = styled.span<PropsCSS> `
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${({active}) => active ? 'black' : 'white'};
`;

const DotsCSS = styled.div `
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots: FC<Props> = ({ slides, activeSlide }) => (
  <DotsCSS>
    {slides.map((slide, i)  => (
      <Dot key={slide} active={activeSlide === i} />
    ))}
  </DotsCSS>
)

export default Dots;