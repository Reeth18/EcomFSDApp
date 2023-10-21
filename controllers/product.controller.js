const ProductModel = require('../models/products.model');

const getAllProducts =  async (req, res) => {
    // Logic which will give us all the products in the Database
    try {
        let productData = await ProductModel.find({});
        if(productData.length < 1){
            return res.status(401).json({
                message: "No data in product model",
            });
        }
        res.status(201).json({
            message: "Data is present in product model",
            productData
        })
    } catch (error){
        console.log("Errors from GET/api/products ", (error));
    }

};


const createProduct = async (req, res) => {
    // logic is to get the product data from request body coming in the request
    try{
        let {
            productName,
            productDescription,
            price, 
            categoryId,
            stockQuantity
        } = req.body;
    
        const productData = new ProductModel({
            Product_name : productName,
            Product_description: productDescription,
            Price: price,
            Category: categoryId,
            Stock_quantity: stockQuantity
        })

        // it is to save all the data into the database
        let sendData = await productData.save();
        res.status(200).json({
            message: "Data Inserted Successfully",
            sendData
        })
    } catch(error){
        console.log("POST /api/products", error);
    }
};

// Update product details by id
// id is passed in the form of params
const updateProduct = async (req, res) => {
    // Both are same
    // let id = req.params.id;
    let {id} = req.params;
    let {price} = req.body;
    console.log((id, price, "from requests"));
    try {
        // findByIdAndUpdate('') 
        const updateProduct = await ProductModel.findByIdAndUpdate(
            {
                _id:id
            },

            {
            Price: price
            },

         {
            new: true,
            // mongoose to return this new document; 
        }) 
        if (!updateProduct){
            return res.status(400).json({
                message: 'product not updated'
            })
        }
        
        return res.status(200).json({
            message: "product updated successfully",
            updateProduct
        })
    } catch (error) {
        console.log(error.message);
    }
};

const deleteProduct = async (req, res) => {
    let {id} = req.params;

    try{
        const deletedProduct = await ProductModel.findByIdAndDelete(
            {
                _id: id,
            }
        ) 
        
        if(!deletedProduct){
            return res.status(400).json({
                message: "Product not Deleted successfully",
            }) 
        }
        return res.status(203).json({
            message: "Product Deleted Successfully",
            deletedProduct
        })

    } catch(error) {
        console.log(error);
    }
}

// GET/api/products?id=1 : Get a specific product using ID
// req.query
const getProductDetailsById = async(req, res) => {
    let {id} = req.query;
    try {
        const getProduct = await ProductModel.findById(
            {
                _id:id
            }
            )
            console.log(getProduct);
        if(!getProduct){
            return res.status(400).json({
                message: "Product Not Found"
            })
        }
        return res.status(200).json({
            message: "Product Found",
            getProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetailsById
}