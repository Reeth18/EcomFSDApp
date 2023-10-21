const express = require('express');
const User = ('../models/user.model');
const UserRouter = express.Router();
const {register} = require('../controllers/user.controller');
const {login} = require('../controllers/user.controller');
const {getAllUser} = require('../controllers/user.controller');

const jwtVerify = require ('../middlewares/jwt.middleware');

UserRouter.post('/register', register);
UserRouter.post('/login', login);

// authorized or protected APIs :
// Using the middleware jwt between end route and the controller function
UserRouter.get('/alluser', jwtVerify, getAllUser);

module.exports = UserRouter;