import styled from 'styled-components';

type Props = {
    transition: number,
    translate: any,
    width: number,
}

const SliderContent = styled.div<Props>`
  transform: translateX(-${({ translate }) => translate}px);
  transition: transform ease-out ${({transition}) => transition}s;
  height: 100%;
  width: ${({ width }) => width}px;
  display: flex;
`;

export default SliderContent;