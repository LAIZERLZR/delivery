const Order = require("../models/Order");
const Cart = require("../models/Cart.model");

module.exports.orderControllers = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.find().populate("product");

      res.json(order);
    } catch (e) {
      console.log(`ошибка в ордере ${e}`);
    }
  },
  addOrder: async (req, res) => {
    try {
      const products = await Cart.find().populate("product");

      const idProduct = products.map((item) => {
        return item.product;
      });

      if (products.length === 0) {
        return false;
      }
      const order = await Order.create({ product: idProduct });

      res.json(order);
    } catch (e) {
      console.log(`ошибка в ордере ${e}`);
    }
  },
};
