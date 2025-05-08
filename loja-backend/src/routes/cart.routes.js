const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const CartController = require('../controllers/CartController');
const verificarToken = require('../middlewares/auth.middleware');


const validarRequisicao = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


router.post(
    '/',
    verificarToken,
    [
        body('productId')
            .isInt({ gt: 0 }).withMessage('ID do produto inválido'),
        body('quantity')
            .isInt({ gt: 0 }).withMessage('Quantidade deve ser maior que 0')
    ],
    validarRequisicao,
    CartController.addItem
);


router.get(
    '/',
    verificarToken,
    CartController.getCart
);


router.delete(
    '/:id',
    verificarToken,
    [
        param('id')
            .isInt({ gt: 0 }).withMessage('ID inválido para remoção')
    ],
    validarRequisicao,
    CartController.removeItem
);


router.put(
    '/:id',
    verificarToken,
    [
        param('id')
            .isInt({ gt: 0 }).withMessage('ID inválido para atualização'),
        body('quantity')
            .isInt({ gt: 0 }).withMessage('Quantidade deve ser maior que 0')
    ],
    validarRequisicao,
    CartController.updateQuantity
);


router.delete(
    '/',
    verificarToken,
    CartController.clearCart
);

module.exports = router;
