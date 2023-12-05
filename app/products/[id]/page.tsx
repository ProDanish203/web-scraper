import { getProduct } from '@/lib/actions';
import React from 'react'

const Product = async ({params}: {params: {id: string}}) => {

    const {id} = params; 
    const {product, success} = await getProduct(id);
    console.log(product);
  return (
    <>
    
    </>
  )
}

export default Product;