"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export const Slider = () => {

  const data = ['/banner.png','/banner.png','/banner.png','/banner.png','/banner.png',]

  return (
    <div className='max-h-[400px] relative'>
     <Carousel
    //  autoPlay
     infiniteLoop
    //  interval={2500}
     showArrows={false}
     showStatus={false}
     showThumbs={false}
     swipeable={true}
     >
      {data.map((img:string, i:number) => (
        <div key={i}>
          <Image src={img} alt="slider" width={450} height={450}
          className='object-contain max-w-[350px] max-h-[350px]'
          />
        </div>
      ))}
      </Carousel>
    </div>
  )
}
