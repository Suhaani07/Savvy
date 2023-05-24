const express = require("express");
const cors = require('cors');
const app=express();
const errorMiddleware =require("./middleware/error");
const cookieParser=require("cookie-parser");
const path=require("path");

app.use(express.json())

app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  }
);
//Middleware for Errors
app.use(errorMiddleware);


module.exports=app