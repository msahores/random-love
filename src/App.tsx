import React, { FC } from 'react';
import Slider from './components/Slider';

const App: FC = () => {
  const images = [{
    id: 'laksjdchn089q437hnaoksjncp9203',
    url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
  },
  {
    id: 'klajshnd98q43roiq383823',
    url: 'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
  },
  {
    id: 'kjhsd9872y398741234',
    url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
  },
  {
    id: '234980yfash78434',
    url: 'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
  },
  ];

  return (
    <Slider slides={images} autoPlay={2} />
    // <Slider slides={images} />
  );
};

export default App;
