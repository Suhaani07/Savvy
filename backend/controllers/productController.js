const Product=require("../Model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product --admin
exports.createProduct= catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
});


//Get all products

exports.getAllProducts=catchAsyncErrors(async (req,res)=>{
    const resultPerPage=10;
    const ProductCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures (Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success : true,
        products,
        ProductCount
    });
});

//Get a product

exports.getProduct=catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
       return next(new ErrorHandler("Product not Found",404));
   }

    res.status(200).json({
        success : true,
        product
    })

});


//Update product --admin

exports.updateProduct=catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
       return next(new ErrorHandler("Product not Found",404));
    }
   

   product = await Product.findByIdAndUpdate(req.params.id,req.body,
    {
        new:true,runValidators : true,
        useFindAndModify : false
    });
    res.status(200).json({
        success : true,
        product
    })

});

//Delete product --Admin

exports.deleteProduct=catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product)
    {
       return next(new ErrorHandler("Product not Found",404));
        
    }


    await product.remove();
    res.status(200).json({
        success : true,
        message : "Deleted Product"
    })
});

//Add or Update Review

exports.productReview=catchAsyncErrors(async (req,res,next)=>{
    const{productId,comment,rating}=req.body;
    
    const review={
       user:req.user._id,
       name:req.user.name,
       rating:Number(rating),
       comment:comment,
    }

    const product=await Product.findById(productId);
    const isReviewed =product.reviews.find(
        
            (rev)=> rev.user.toString()===req.user._id.toString()
        
    );
    
        if(isReviewed)
        {
            product.reviews.forEach((rev)=> 
            {
                if(rev.user.toString()===req.user._id.toString())
            {
                rev.rating=rating,
                rev.comment=comment
            }
        });
    }else
        {
            product.reviews.push(review);
            product.NumofReview=product.reviews.length;
        }
        let avg=0;
        product.reviews.forEach((rev)=>
        {
            avg=avg+rev.rating;
        });
        product.ratings=avg/product.reviews.length;

        await product.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
        });
});

//Get all reviews of a product

exports.getAllReviews=catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.query.id);
    if(!product)
    {
       return next(new ErrorHandler("Product not Found",404));
   }

    res.status(200).json({
        success : true,
        reviews:product.reviews,
    })

});

//Delete Product Review

exports.deleteReviews=catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product)
    {
       return next(new ErrorHandler("Product not Found",404));
   }

   const reviews=product.reviews.filter(
    (rev)=> rev._id.toString()!==req.query.id.toString());
   let avg=0;
        reviews.forEach((rev)=>
        {
            avg=avg+rev.rating;
        });
        const ratings=avg/reviews.length;
        
        const numofReview=reviews.length;
        await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings,
            numofReview},
            {
            new:true,
            runValidators:true,
            useFindAndModify:false
        });


        res.status(200).json({
        success : true,
    })

});
