// const { response } = require('express');
const CategoryModel = require('../models/category.model')

// GET /api/categories: Get a list of all categories.
const getCategory = async (req, res) => {
    try {
        let categoryData = await CategoryModel.find({});
        if (categoryData.length < 1){
            return res.status(401).json({
                message: "Category didn't match the required criteria"
            })
        }
        return res.status(200).json({
            message: "Category Matched",
            categoryData
        })
    } catch (error) {
        console.log(error);
    }
}

// app.post('/api/categories',
const createCategory = async (req, res) => {
    try {
        // Make sure to take out from request body the json keys.
        let {
            categoryName,
            description,
        } = req.body;

        // Make sure to insert the values inside the model in the same way defined in the schema
        const categoryData = new CategoryModel({
            Category_name : categoryName,
            Description: description,
        })
        let sendCategoryData = await categoryData.save();
        res.status(200).json({
            message: "Data inserted successfully",
            sendCategoryData
        })
    } catch(error) {
        console.log(error, 'POST /api/categories');
        res.status(404).json({
            message: "Data Cannot be Inserted"
        })
    }
}

// PUT /api/categories/:id: Update category details.
const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {
        categoryName, 
        description
} = req.body;
    console.log(id, categoryName, description, "from requests");
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            {
                _id:id
            },
            {
                Category_name : categoryName, 
                Description: description
            },
            {
                new: true,
            }
        )
        if (!updatedCategory) {
            return res.status(400).json({
                message: "Not updated Error"
            })
        }

        return res.status(200).json({
            message: "Updated",
            updatedCategory
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message: "Wrong",
        })

    }
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
}