import React, { FC, useEffect, useState } from 'react';
import QuickSlider from './components/QuickSlider';
import useGetImages from './components/hooks/useGetImages';

const App: FC = () => {
  const [slides, setSlides] = useState([]);
  const [images, setCategory] = useGetImages('SEB7Gy1equIna2E1uHid3lxAk_TcdW-hOk3PW2lB5n4');

  useEffect(() => {
    const param = window.location.pathname.slice(1);
    if (param) setCategory(param);
  }, []);

  useEffect(() => {
    const preSlides: any = [];
    images.map(image => (
      preSlides.push({
        id: image.id,
        url: image.urls.regular,
        name: image.alt_description,
      })
    ));

    setSlides(preSlides);
  }, [images, setCategory]);

  return (
    <div className="App">
      {slides.length > 0 && <QuickSlider slides={slides} />}
    </div>
  );
};
export default App;
