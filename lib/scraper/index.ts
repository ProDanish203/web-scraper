import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export const scrapeAmazonProduct = async (url:string) => {
    if(!url) return

    // Bright roxy configuration
    const username = String(process.env.BRIGHT_USERNAME);
    const password = String(process.env.BRIGHT_PASSWORD);
    const port = 22225
    const sessionId = (100000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${sessionId}`,
            password,       
        },
        host: 'brd.superproxy.io',
        port,
        rejectedUnauthorized: false,        
    }

    try{
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        const title = $('#productTitle').text().trim();

        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        ) 

        const originalPrice = extractPrice(
            $('.a-price.a-text-price span.a-offscreen'),
            $('#priceblock_ourprice'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price'),
        )

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = $('#imgBlkFront').attr("data-a-dynamic-image") ||
        $("#landingImage").attr('data-a-dynamic-image') || '{}'; 

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

        const description = $('#productDescription p span').text() || '';

        const data = {
            url, 
            currency: currency || '$',
            image: imageUrls[0],
            title,
            description: description,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: "Category",
            reviewsCount: 100,
            stars: 4,
            outOfStock,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

        // console.log(data);
        return data;
    
    }catch(error:any){
        throw new Error(`Failed to scrape data: ${error.message}`)
    }

}