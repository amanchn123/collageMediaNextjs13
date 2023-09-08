import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default function UniversitySlider() {
  const portsize=useMediaQuery('(max-width: 700px)')
  return (
    <>
      <Swiper
        slidesPerView={portsize?3:4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>     
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>    
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>      
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>      
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>      
        <SwiperSlide><img style={{height:portsize?"90px":"130px",width:portsize?"80px":"120px",borderRadius:"14px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.3)"}}  src='collage1.png'/> </SwiperSlide>
      </Swiper>
    </>
  );
}