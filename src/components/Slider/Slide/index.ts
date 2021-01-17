import styled from 'styled-components';

type Props = {
    content: string,
}
const Slide = styled.div<Props>`
      height: 100;
      width: 100%;
      background-image: url('${({content}) => content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;

export default Slide;