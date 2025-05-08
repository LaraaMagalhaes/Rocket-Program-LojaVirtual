const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const errorHandler = require('./middlewares/errorHandler'); // ✅ Importado
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(errorHandler);

module.exports = app;
