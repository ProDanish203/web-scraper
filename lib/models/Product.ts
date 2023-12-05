import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    url: {
        type: String,
        unique: [true, "Url already scraped"],
        required: [true, "URL is required"]
    },
    currency: { type: String, required: [true, "Currency is required"]},
    image: { type: String, required: [true, "Image is required"]},
    title: { type: String, required: [true, "Title is required"]},
    currentPrice: { type: Number, required: [true, "cuurent price is required"]},
    originalPrice: { type: Number, required: [true, "original price is required"]},
    priceHistory: [
        {
            price: {type: Number, required: true},
            date: { type: Date, default: Date.now}
        },
    ],
    lowestPrice: Number,
    highestPrice: Number,
    averagePrice: Number,
    discountrate: Number,
    description: String,
    category: String,
    reviewsCount: Number,
    stars: Number,
    outOfStock: { type: Boolean, default: false },
    users: [
        {email: {type: String, required: true}},
    ]
},
{timestamps: true}
)

const Product = models.Product || model('Product', ProductSchema);

export default Product;