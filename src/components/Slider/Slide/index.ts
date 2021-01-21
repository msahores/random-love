import styled from 'styled-components';

type Props = {
    content: string,
    width: number,
}
const Slide = styled.div<Props>`
      height: 100;
      width: ${({ width }) => width}px;
      background-image: url('${({ content }) => content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;

export default Slide;
