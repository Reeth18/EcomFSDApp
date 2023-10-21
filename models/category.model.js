const mongoose = require ('mongoose');

const { Schema } = mongoose;

// Category Schema
const categorySchema = new Schema({
    Category_name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
})

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;