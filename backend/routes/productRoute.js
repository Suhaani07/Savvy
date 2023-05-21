const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProduct, productReview, getAllReviews, deleteReviews } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router =express.Router();

router.route("/products")
.get(getAllProducts);

router.route("/admin/products/new")
.post(createProduct);

router.route("/admin/products/:id")
.put(updateProduct)
.delete(deleteProduct);

router.route("/review")
.put(isAuthenticatedUser,productReview);

router.route("/reviews")
.get(getAllReviews)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReviews)

router.route("/products/:id")
.get(getProduct);

module.exports=router