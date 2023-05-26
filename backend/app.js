const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const cartRoutes = require('./routes/cart');
const singularRoutes = require('./routes/singularProduct');
const addCartRoutes = require('./routes/addCart');
const createUser = require('./routes/user');
const addProduct = require('./routes/addProduct');

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
const corsOptions = {
      origin: 'http://localhost', // Cambia 'http://tudominio.com' por el dominio de tu cliente
      credentials: true
    }; 
    
app.use(cors(corsOptions));

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/singularProduct', singularRoutes);
app.use('/addCart', addCartRoutes);
app.use('/user', createUser);
app.use('/addProduct', addProduct);

 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal', details: err.message });
});

 

const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});