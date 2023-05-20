const Order=require("../Model/orderModel");
const Product=require("../Model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product --admin
exports.newOrder= catchAsyncErrors(async (req,res,next)=>{

    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
});

    res.status(201).json({
        success : true,
        order
    })
});

//Get a Order --Admin

exports.getOrder=catchAsyncErrors(async (req,res,next)=>{
    let order = await Order.findById(req.params.id).populate("user","name email")
    if(!order)
    {
       return next(new ErrorHandler("Order not Found with this ID",404));
   }

    res.status(200).json({
        success : true,
        order
    })

});

//Get a Order --Logged in User

exports.myOrders=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    if(!order)
    {
       return next(new ErrorHandler("Orders not Found for this user",404));
   }
    res.status(200).json({
        success : true,
        order
    })

});

//Get All Orders --Admin

exports.getAllOrders=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.find();
    if(!order)
    {
       return next(new ErrorHandler("Orders not Found for this user",404));
   }
   let totalAmount=0;
   order.forEach((order)=>{
    totalAmount+=order.totalPrice
   })
    res.status(200).json({
        success : true,
        totalAmount,
        order
    })

});

//Update Order Status --Admin

exports.updateOrder=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
       return next(new ErrorHandler("Orders not Found with this ID",404));
   }
   if(order.orderStatus==="Delivered")
    {
       return next(new ErrorHandler("Order is Already Delivered",400));
   }

   if(req.body.status==="Shipped")
   {
   order.orderItems.forEach(async(o)=>{
    await updateStock(o.product,o.quantity);
   });
}
   order.orderStatus=req.body.status;
   if(req.body.status==="Delivered")
   {
    order.deliveredAt=Date.now();
   }

   await order.save({validateBeforeSave:false});

    res.status(200).json({
        success : true,
        order
    })

});

async function updateStock(id,quantity)
{
    const product = await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
    
}

//Delete Order --Admin

exports.deleteOrder=catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order)
    {
       return next(new ErrorHandler("Orders not Found for this user",404));
   }
    await order.remove();
    res.status(200).json({
        success : true,
        order
    })

});