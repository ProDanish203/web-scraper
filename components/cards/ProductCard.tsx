import { AllProduct, Product } from '@/utils/types';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props{
  data: AllProduct
}

export const ProductCard = ({data}: Props) => {
  
  return (
    <Link href={`/products/${data.id}`} className='bg-neutral-100 p-2 shadow-md rounded-md'>
      <div className='rounded-md bg-neutral-200 overflow-hidden flex items-center justify-center h-[250px]'>
        <Image src={data.image} alt={data.title} width={300} height={300}
        className='object-cover'
        />
      </div>

      <div className='p-2'>
        <h3 className='text-lg font-semibold'>{data.title.substring(0,15)}...</h3>
        
        <div className='flex w-full gap-2 justify-between'>
          <span className='text-neutral-500'>{data.category}</span>
          <span className='text-primary text-xl font-bold'>{`${data.currency}${data.currentPrice}`}</span>
        </div>

      </div>
    </Link>
  )
}
