import { useState } from 'react';
import slides from './mock.json';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {

  const [isLoop, setIsLoop] = useState(true);
  const [isNav, setIsNav] = useState(true);
  const [isPags, setIsPags] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const settings = {
    customPaging: function(i: number) {
      return (
        <a>
          <img src={slides[i].image} width={50}  alt='$'/>
        </a>
      );
    },
    dots: isPags,
    dotsClass: "slick-dots slick-thumb",
    infinite: isLoop,
    className: 'center',
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: +inputValue || 5000,
    pauseOnHover: true,
    arrows: isNav,
  };

  const createBox = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, name: string) => (
    <div className='row'>
      <input checked={state} onChange={() => setState(prev => !prev)} type='checkbox' className='box' name={name} id={name}/>
      <label htmlFor={name} >{name}</label>
    </div>
  )

  return (
    <div className='container'>

      <Slider {...settings}>
        {slides.map((slide: { image: string, id: number }) => (
          <div key={slide.id}>
            <img src={slide.image} alt='$#' />
          </div>
        ))}
      </Slider>
      <div className='settings'>
        <h3>Settings</h3>
        <div className='flex-block'>
          {createBox(isLoop, setIsLoop, "loop")}
          {createBox(isNav, setIsNav, "nav")}
          {createBox(isPags, setIsPags, "pags")}
        </div>
        <div className='row'>
          <label htmlFor='delay'>delay</label>
          <input onChange={(e) => setInputValue(e.target.value)} type='number' className='box' name="delay" id="delay" placeholder='default: 5000 '/>
          <span>ms</span>
         </div>
      </div>

    </div>
  );
}

export default App;
