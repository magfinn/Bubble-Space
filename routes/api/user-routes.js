const router = require('express').Router();
const {
  postNewUser,
  updateUser,
  removeUser,
  getAllUsers,
  getUserById,
  postNewFriend,
  removeFriend,
} = require('../../controllers/user-controllers');

//Set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(postNewUser);

//Set up POST, UPDATE and DELETE at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);

//Set up POST & DELETE at /api/users/friends/:friendId
router.route('/:id/friends/:friendId').post(postNewFriend).delete(removeFriend);

module.exports = router;
