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

const friendController = {
  //add new friend
  postNewFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found by this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //remove Friend
  removeFriend({ params }, res) {
    User.findOneAndDelete(
      { _id: params.UserId },
      { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = { userController, friendController };
