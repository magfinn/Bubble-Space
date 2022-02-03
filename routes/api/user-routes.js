const router = require('express').Router();
const { newUser, updateUser, removeUser, getAllUsers } = require ('../../controllers/user-controllers');

//GET all users /api/users

//GET single user by its id & populate friend and thought data

//POST new user

//Update a user by Id

//Delete user by Id


//api/users/:userId/firneds/:friendId???? (post & delete)

module.exports = router;