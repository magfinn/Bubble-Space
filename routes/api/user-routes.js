const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
 } = require('../../controllers/user-controller');


// Routes for ('/')
router
 .route('/')
 .get(getAllUsers)
 .post(createUser);

// Routes for ('/:id')
router
 .route('/:id')
 .get(getUserById)
 .put(updateUser)
 .delete(deleteUser);


//(:userId/friends/:friendId)
//POST new friend to friend list
//DELETE friend from friend list

module.exports = router;