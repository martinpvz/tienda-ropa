const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories'); // Añade esta línea
const cartRoutes = require('./routes/cart'); // Añade esta línea
const singularRoutes = require('./routes/singularProduct'); // Añade esta línea
const addCartRoutes = require('./routes/addCart'); // Añade esta línea
const createUser = require('./routes/user'); // Añade esta línea

// const cookieParser = require('cookie-parser');


const app = express();

// app.use(cookieParser());
// res.cookie('id', '1');

app.use(cors()); // Habilita CORS en todas las rutas
app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes); // Añade esta línea
app.use('/cart', cartRoutes); // Añade esta línea
app.use('/singularProduct', singularRoutes); // Añade esta línea
app.use('/addCart', addCartRoutes); // Añade esta línea
app.use('/user', createUser); // Añade esta línea

// app.js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal', details: err.message });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});