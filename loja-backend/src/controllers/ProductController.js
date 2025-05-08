const prisma = require('../models/PrismaService');

class ProductController {
  static async list(req, res) {
    const products = await prisma.product.findMany();
    res.json(products);
  }

  static async create(req, res) {
    const { name, price, description } = req.body;

    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), description }
    });

    res.json(product);
  }

  // src/controllers/ProductController.js
static async delete(req, res) {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar produto' });
    }
}

}

module.exports = ProductController;
