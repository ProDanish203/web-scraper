import { getRelatedProducts } from '@/lib/actions';
import { redirect } from 'next/navigation';
import React from 'react'
import { ProductCard } from '../cards';

interface Props{
    id:string;
}

export const RelatedProducts = async ({id}: Props) => {

    const { relatedProducts, success} = await getRelatedProducts(id);
    if(!success) redirect('/');
  return (
    <>
    {relatedProducts && relatedProducts.length > 0 && (
      <section className='py-10 md:px-5 px-3'>

        <h3 className='text-primary font-extrabold text-3xl'>Related Products</h3>

        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {relatedProducts.map((prod:any, i:number) => (
            <ProductCard key={i} data={prod}/>
            ))
          }
        </div>

    </section>
    )}
  </>
  )
}
