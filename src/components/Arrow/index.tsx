import React, { FC } from 'react';
import styled from 'styled-components';
import rightArrow from '../../img/right-arrow.svg';
import leftArrow from '../../img/left-arrow.svg';

interface Props {
  direction: string,
  handleClick: () => void
}

const Container = styled.div<Props>`
  display: flex;
  position: absolute;
  top: 50%;
  ${({ direction })=>direction === 'right' ? `right: 25px` : `left: 25px`};
  height: 50px;
  width: 50px;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    transform: translateX(${({ direction }) => direction === 'left' ? '-2' : '2'}px);
    &:focus {
      outline: 0;
    }
  }
`;

const Arrow: FC<Props> = ({ direction = 'right', handleClick }) => (
    <Container direction={direction} handleClick={handleClick}>
        <div
          onClick={handleClick}
        >
          {direction === 'right' ? <img src={rightArrow} alt="" /> : <img src={leftArrow} alt="" />}
        </div>
    </Container>
)

export default Arrow;