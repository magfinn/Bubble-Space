const { User } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No User with this id!' });
        }
        res.json(dbUserData);
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
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found by this ID.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //remove User
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).json({ message: 'No User with this id!' });
        }
        res.json(deletedUser);
      })
      .catch((err) => res.json(err));
  },

  //add a friend to friend array
  postNewFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: { friendId: params.friendId } } },
      { new: true }
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
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found by this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
