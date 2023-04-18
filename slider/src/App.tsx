import React, { useState, useRef } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css';
import 'swiper/css/effect-cube';
import slides from './mock.json';
import { Navigation, Pagination, Autoplay, EffectCube } from 'swiper';

function App() {
  const [isLoop, setIsLoop] = useState(true);
  const [isNav, setIsNav] = useState(true);
  const [isPags, setIsPags] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const swiperRef = useRef<any>(null);

  console.log('swiperRef', swiperRef);
  

 
  const createBox = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>, name: string) => (
    <div className='row'>
      <input checked={state} onChange={() => setState(prev => !prev)} type='checkbox' className='box' name={name} id={name}/>
      <label htmlFor={name} >{name}</label>
    </div>
  )

  return (
    <div className='container'>
      <div
      onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
      onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
      >
        <Swiper
        ref={swiperRef}
        effect="cube"
        cubeEffect={{
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
          loop={isLoop}
          modules={[Navigation, Pagination, Autoplay, EffectCube]}
          autoplay={{
            delay: +inputValue || 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          style={{  width: "600px", height: "100%"}}
          //slidesPerView={1}
          centeredSlides={true}
          navigation={isNav}
          pagination= {isPags ? { clickable: true } : false} 
        >
          {slides.map((slide: {image : string, id: number}) =>
            <SwiperSlide style={{"width": "auto", "textAlign": "center"}} key={slide.id}>
              <img src={slide.image} alt={slide.image}/>
              <p>Картинка {slide.id}</p>
              <p style={{paddingBottom: "10px"}}>{slide.id}/{slides.length}</p>
            </SwiperSlide>)}

        </Swiper>
      </div>

      <div className='settings'>
        <h3>Settings</h3>
        <div style={{display: "flex"}}>
          {createBox(isLoop, setIsLoop, "loop")}
          {createBox(isNav, setIsNav, "nav")}
          {createBox(isPags, setIsPags, "pags")}
        </div>
        <div className='row'>
          <label htmlFor='delay'>delay</label>
          <input onChange={(e) => setInputValue(e.target.value)} type='number' className='box' name="delay" id="delay" placeholder='default: 5000ms '/>
          <span>ms</span>
         </div>
      </div>
       
    </div>
  );
}

export default App;
