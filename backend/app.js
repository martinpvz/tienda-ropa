const express = require('express');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories'); // Añade esta línea
const cartRoutes = require('./routes/cart'); // Añade esta línea

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes); // Añade esta línea
app.use('/cart', cartRoutes); // Añade esta línea

// app.js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal', details: err.message });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});