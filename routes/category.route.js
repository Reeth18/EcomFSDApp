const express = require('express');
const CategoryRouter = express.Router();

const {
    getCategory,
    createCategory,
    updateCategory,
} = require('../controllers/category.controller')


CategoryRouter.get('/api/categories', getCategory);
CategoryRouter.post('/api/categories', createCategory);
CategoryRouter.put('/api/categories/:id', updateCategory);

module.exports = CategoryRouter;