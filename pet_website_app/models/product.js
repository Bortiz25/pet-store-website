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
    addToCart(){
      
    }
    showThis() {
     console.log('these functions work')
    }
}    


/*
async function deleteProduct(name_) {
  try {
  const value = await Product.deleteOne({productName: name_});
  console.log("we deleted it!!");
  console.log(value);

  } catch (err){
    console.log("error deleting product:", err);
  }
}
*/
// product collection from mongoDB
const Product = mongoose.model('Product', productSchema);


module.exports = { ProductClass, Product }
