const prisma = require('../models/PrismaService');

class CartController {

    static async addItem(req, res) {
        const { productId, quantity } = req.body;
        const userId = req.user.userId;

        const existingItem = await prisma.cartItem.findFirst({
            where: { productId, userId }
        });

        if (existingItem) {
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
            return res.json(updatedItem);
        }

        const newItem = await prisma.cartItem.create({
            data: {
                productId,
                quantity,
                userId,
            },
        });

        res.status(201).json(newItem);
    }

    static async getCart(req, res) {
        const userId = req.user.userId;
        const items = await prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
            },
        });

        res.json(items);
    }

    static async removeItem(req, res) {
        const { id } = req.params;
        await prisma.cartItem.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    }

    static async clearCart(req, res) {
        const userId = req.user.userId;
        await prisma.cartItem.deleteMany({
            where: { userId },
        });

        res.status(204).send();
    }

    static async updateQuantity(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;

        if (isNaN(id) || isNaN(quantity)) {
            return res.status(400).json({ message: 'ID ou quantidade inválida' });
        }

        try {
            const existingItem = await prisma.cartItem.findUnique({
                where: { id: parseInt(id) }
            });

            if (!existingItem) {
                return res.status(404).json({ message: 'Item não encontrado no carrinho' });
            }

            const updatedItem = await prisma.cartItem.update({
                where: { id: parseInt(id) },
                data: { quantity: parseInt(quantity) }
            });

            res.json(updatedItem);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Erro ao atualizar a quantidade no backend' });
        }
    }
}

module.exports = CartController;
