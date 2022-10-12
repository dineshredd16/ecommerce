const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create product  -- admin
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
  const product =  await Product.create(req.body);
  res.status(201).json({status: true, product})
});

// get all products
exports.getAllProducts = catchAsyncErrors( async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({status: true, products});
});

// update product -- admin
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product){
    return next(new ErrorHandler(`product not found with id ${req.params.id}`, 404));
  } 
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, unValidators: true, useFindAndModify: false});
  res.status(200).json({status: true, product});
});

// delete product
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product){
    return next(new ErrorHandler(`product not found with id ${req.params.id}`, 404));
  } 
  await product.remove();
  res.status(200).json({status: true, message: "product deleted succesfully"});
});

// get product details
exports.getProductDetails = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product){
    return next(new ErrorHandler(`product not found with id ${req.params.id}`, 404));
  } 
  res.status(200).json({status: true, product});
});