"use server"
import { revalidatePath } from "next/cache";
import { connectDb } from "../config/db";
import Product from "../models/Product";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";


export const scrapeAndStore = async (productUrl:string) => {
    if(!productUrl) return;
    try{
        connectDb()

        const scrapedProduct = await scrapeAmazonProduct(productUrl)

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({url: product.url});

        if(existingProduct){
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ];

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                // @ts-ignore
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url: scrapedProduct.url}, 
            product,
            {upsert: true, new: true}
        )

        revalidatePath(`/products/${newProduct._id}`);

        return {newProduct, success: true, message: "Product scraped succesfully"}
    }catch(error:any){
        throw new Error(`Failed to scrape data: ${error.message}`)
    }
}


export const getProduct = async (id:string) => {
    try{
        connectDb()
        const product = await Product.findById(id)
        if(!product)
            return {success: false, message: "Failed to fetch product"}

        return {product, success: true, message: "Product fetched succesfully"}
    }catch(error:any){
        throw new Error(`Failed to fetch product: ${error.message}`)
    }
}

export const getAllProducts = async () => {
    try{
        connectDb()
        const products = await Product.find().select("_id title url currency curretnPrice image category")
        if(!products)
            return {success: false, message: "Failed to fetch products"}
        
        return {products, success: true, message: "Products fetched succesfully"}
    }catch(error:any){
        throw new Error(`Failed to fetch products: ${error.message}`)
    }
}



