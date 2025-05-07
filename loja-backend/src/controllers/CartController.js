const prisma = require('../models/PrismaService');

class CartController {
  static async list(req, res) {
    const items = await prisma.cartItem.findMany();
    res.json(items);
  }

  static async add(req, res) {
    const { productId, quantity } = req.body;

    const cartItem = await prisma.cartItem.create({
      data: { productId, quantity }
    });

    res.json(cartItem);
  }
}

module.exports = CartController;
