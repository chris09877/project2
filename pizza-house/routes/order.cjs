const express = require('express');

const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, formUpdateOrder, getOrderByUserId } = require('../controllers/order.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
console.log("route order ok");
//oco endpoints rien a voir avec url browser c'est the uri vu que la base dans server a ete defien as /pizzas => PIzzacontroller 
//il va chercher direct la partie suivante qui est id,delete etc
//le url qui vas chercher c'est celui que tu fetch
/* READ */
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getOrderByUserId);

/* UPDATE */

router.patch("/update/:id", updateOrder);
router.patch("/checkout/:id", formUpdateOrder);

/* DELETE */

router.delete("/delete/:id", deleteOrder);

/* CREATE */

router.post("/create", createOrder);


module.exports = router;