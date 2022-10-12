const Product = require("../models/productModel");

// create product  -- admin
exports.createProduct = async (req, res, next) => {
  const product =  await Product.create(req.body);
  res.status(201).json({status: true, product})
}

// get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({status: true, products});
}

// update product -- admin
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product){
    res.status(500).json({status: false, message: `product not found with id ${req.params.id}`});
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, unValidators: true, useFindAndModify: false});
    res.status(200).json({status: true, product});
  }
}

// delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product){
    res.status(500).json({status: false, message: `product not found with id ${req.params.id}`});
  } else {
    await product.remove();
    res.status(200).json({status: true, message: "product deleted succesfully"});
  }
}

// get product details
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product){
    res.status(500).json({status: false, message: `product not found with id ${req.params.id}`});
  } else {
    res.status(200).json({status: true, product});
  }
}

exports.dinesh = (req, res) =>{
  res.status(200).json({status: true, message: "Hi Dinesh"})
}