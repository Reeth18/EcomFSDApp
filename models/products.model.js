const mongoose = require ('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  // Validations : {required:true} If not provided will throw an error
  Product_name: { 
    type: String, 
    required: true,
},

  Product_description: { 
    type: String, 
    required: true,
},

  Price: { 
    type: String,
    required: true,
},

    // For category refer to {Category_id} Schema
  Category: { 
    // type: String, 
    // This field will store object id of another schema
    // Difference between this and foreign key is that:- in foreign key tables are joined based on column and that can be any column(SQL concept) but in MongoDb it has to be an "Object_id"
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
},

  Stock_quantity: { 
    type: Number, 
    required: true,
    default: 20,
},
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;