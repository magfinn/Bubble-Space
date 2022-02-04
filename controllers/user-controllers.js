const { User } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.UserId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No User with this id!' });
        }
        return;
      })
      .catch((err) => res.json(err));
  },

  //add new user
  postNewUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //remove User
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.UserId })
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({ message: 'No User with this id!' });
        }
        return;
      })
      .catch((err) => res.json(err));
  },
};

// /api/users/:userId/friends/:friendId
// friendcontroller (post & delete)

module.exports = userController;
