const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getuserdetails, changepassword, updateUserDetails, getAllUsers, findUser, updateUser, deleteUser } = require("../controllers/userController");
const router =express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

router.route("/register")
.post(registerUser);

router.route("/login")
.post(loginUser);

router.route("/password/forgot")
.post(forgotPassword);

router.route("/password/reset/:token")
.put(resetPassword);

router.route("/myprofile/:id")
.get(getuserdetails);

router.route("/changepassword")
.get(isAuthenticatedUser,changepassword);

router.route("/myprofile/:id/update")
.put(updateUserDetails);

router.route("/admin/users")
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),findUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUser)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

router.route("/logout")
.get(logout);


module.exports=router;
