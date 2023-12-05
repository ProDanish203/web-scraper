import { getProduct } from '@/lib/actions';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const Product = async ({params}: {params: {id: string}}) => {

    const {id} = params; 
    const {product, success} = await getProduct(id);
    if(!success) redirect('/')
  return (
    <div className='mt-10 px-3'>
        
        <div className='flex xl:items-center xl:justify-between gap-10 xl:flex-row flex-col'>
            <div>
                <Image src={product.image} alt={product.title} width={500} height={400} className="object-contain"/>
            </div>

            <div className='max-w-[600px] flex-1 flex flex-col'>
                <div>

                <h2 className='lg:text-2xl text-xl font-bold'>{product.title}</h2>

                <div className='mt-4'>
                    <p className='lg:text-3xl text-2xl font-bold'>{product.currency}{formatNumber(product.currentPrice)}</p>
                    <p className='text-neutral-600 lg:text-xl text-lg line-through'>{product.currency}{formatNumber(product.originalPrice)}</p>
                </div>
                </div>

                <div className='my-5 grid grid-cols-2 gap-4'>
                    <div className='bg-neutral-200 p-2 rounded-md'>
                        <p>Current Price</p>   
                        <p className='text-xl font-semibold'>{product.currency} {formatNumber(product.currentPrice)}</p>
                    </div>

                    <div className='bg-neutral-200 p-2 rounded-md'>
                        <p>Highest Price</p>   
                        <p className='text-xl font-semibold'>{product.currency} {formatNumber(product.highestPrice)}</p>
                    </div>

                    <div className='bg-neutral-200 p-2 rounded-md'>
                        <p>Average Price</p>   
                        <p className='text-xl font-semibold'>{product.currency} {product.averagePrice ? formatNumber(product.averagePrice) : formatNumber(product.currentPrice)}</p>
                    </div>

                    <div className='bg-neutral-200 p-2 rounded-md'>
                        <p>Lowest Price</p>   
                        <p className='text-xl font-semibold'>{product.currency} {formatNumber(product.lowestPrice)}</p>
                    </div>
                </div>

                <div>
                    <button className='bg-primary text-bg rounded-full w-full py-2 text-xl cursor-pointer'>Track</button>
                </div>

                <div className='my-5'>
                    <p className='text-lg font-semibold'>Product Description</p>
                    <p className='text-neutral-600'>{product.description}</p>
                </div>
            </div>

        

        </div>


    </div>
  )
}

export default Product;