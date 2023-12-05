import React from 'react'
import { ProductCard } from '../cards'
import { getAllProducts } from '@/lib/actions'

export const Products = async () => {

    const { products, success} = await getAllProducts();
  return (
    <section className='py-10 md:px-5 px-3'>

        <h3 className='text-primary font-extrabold text-3xl'>Trending</h3>

        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {products && products.length > 0 ? 
            products.map((prod:any, i:number) => (
                <ProductCard key={i} data={prod}/>
            ))
           : (
            <p className='text-xl font-bold'>
              Nothing to display
            </p>
           )
          }
        </div>

    </section>
  )
}
