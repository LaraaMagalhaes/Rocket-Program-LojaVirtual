const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const verificarToken = require('../middlewares/auth.middleware');

router.get('/', ProductController.list);

router.post(
  '/',
  verificarToken,
  [
    body('name').notEmpty().withMessage('Nome do produto é obrigatório'),
    body('price').isFloat({ gt: 0 }).withMessage('Preço deve ser maior que 0'),
    body('description').notEmpty().withMessage('Descrição é obrigatória')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  ProductController.create
);

router.delete('/:id', verificarToken, ProductController.delete);

module.exports = router;
