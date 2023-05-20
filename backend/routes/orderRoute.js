const express = require("express");
const { newOrder, getOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router =express.Router();

router.route("/order/new")
.post(isAuthenticatedUser,newOrder);

router.route("/admin/order/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getOrder)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

router.route("/orders/me")
.get(isAuthenticatedUser,myOrders);

router.route("/admin/orders")
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);



module.exports=router