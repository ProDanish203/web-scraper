import Image from 'next/image';
import React from 'react';
import { SearchBar } from '../helpers';

export const Banner = () => {
  return (
    <section className='flex flex-col md:flex-row gap-4 items-center justify-between py-10 md:px-5 px-3'>
      <div className='w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left'>
        <h2 className='text-4xl md:text-5xl font-extrabold leading-10'>
          Unleash Your Shopping Experience with{' '}
          <span className='text-primary'>Pyzon</span>
        </h2>

        <h5 className='text-neutral-700 mt-5'>
        Dive into luxury with Pyzon, your one-stop destination for curated elegance. From chic apparel to must-have accessories, discover timeless style with every click. Elevate your shopping experience, where quality meets trendsetting fashion. Redefine your style effortlessly at Pyzon.
        </h5>

        <SearchBar/>
      </div>

      <div className='relative w-full md:w-1/2 flex justify-center'>
        <div className='w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-primary rounded-full flex items-center justify-center'>

        <Image
          src='/banner.png'
          alt='banner'
          width={400}
          height={400}
          className='object-cover max-w-[400px] max-h-[400px] w-full h-full'
          />
        </div>
      </div>
    </section>
  );
};
