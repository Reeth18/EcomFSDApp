const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const app = express();
app.use(morgan());
app.use(cors());
app.use(express.json());

app.use(express.static('views'));

//***************************//
// Define Port No
const portNo = process.env.portNo;
//*******************//

//********** Database Connection **********//
const main = require('./dbConnection');

main()
  .then(() => console.log(`Database Connected`))
  .catch((err) => console.log(err));

// ******************************* //

// ******** Defining the Schema of MongoDB ********* //

// Inventory Schema
// const inventorySchema = new Schema({
//     // (Reference to Product Schema)
//     Product : {},
//     Quantity : {},
//     Date_added : {},
// });

// ********************** //

// Product API Endpoints: Products Model
// GET/api/products: Display(Get) All the products
// app.get('/api/products', );
// POST /api/products: Create a product
// app.post('/api/products', );

// Category API Endpoints
// GET /api/categories: Get a list of all categories.
// ******* Main or Gateway API Endpoints for our Product
// Make sure you write this entry point always before writing any api
const ProductRouter = require('./routes/product.route')
app.use('/products', ProductRouter);
const CategoryRouter = require('./routes/category.route')
app.use('/categories', CategoryRouter);

const userRouter = require ('./routes/user.route')
app.use('/auth', userRouter);

// * is used for catch all route
// * is basically known as the wild character
app.use('*', (req, res, next) => {
  // res.send("Route doesnot exist or you are not providing a correct request");
  const error = new Error("Route doesnot exist or you are not providing a correct request");
  error.status = '400';
  next(error);
});
// app.use("/product/*", )

// How to create custom error handlers
// We are going to create a custom middleware for handling the errors
app.use('*',(error, req, res, next) => {
  if (!error) {
    next();
  }
  res.status(400).json({
    // error: err.message
    // .stack is used to give the entire error the manner that is provided in the terminal
    error: error.stack,
  })
});



// ********** Running the Server **********//
app.listen(portNo, () => {
  console.log(`Server is running on ${portNo}`);
});


// 