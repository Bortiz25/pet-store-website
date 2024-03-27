const mongoose = require('mongoose');

// Schema with fields from products collection in MongoDB
const productSchema = new mongoose.Schema({
productName: String,
price: Number,
tags: Array,
category: String,
img: String,
description: String
});

//product class starter code
class ProductClass {
    constructor(productName, price, tags, category, img, description) {
    this.productName = productName;
    this.price = price;
    this.tags = tags;
    this.category = category;
    this.img = img;
    this.description = description;
    }
   
    // methods
    display() {}
    getName() {}
    getImg() {
      return this.img;
    }
    getDescription() {}
    getPrice(){}
}    

// product collection from mongoDB
const Product = mongoose.model('Product', productSchema);

module.exports = { ProductClass, Product };
