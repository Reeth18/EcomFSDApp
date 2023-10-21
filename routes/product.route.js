// we are going to make a product router which is a custom router
const express = require('express');
const ProductRouter = express.Router();

const {
    getAllProducts,
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetailsById
} = require('../controllers/product.controller')

// Get request
ProductRouter.get('/api/products', getAllProducts);

// Post request
ProductRouter.post('/api/products', createProduct);

// Put Request : /Update a Product by id
ProductRouter.put('/api/products/:id', updateProduct);

// Delete Request: /Delete a Product by id
ProductRouter.delete('/api/products/:id', deleteProduct);

// GET/api/products/?id=1
ProductRouter.get('/getproducts', getProductDetailsById)

module.exports = ProductRouter;