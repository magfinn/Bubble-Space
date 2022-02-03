const { User } = require('../models');

const userController = {
  //add new user
//   addUser({ params, body }, res) {}

    //update user
    // updateUser({ params, body}, res) {}

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
}
};

// /api/users/:userId/friends/:friendId
// friendcontroller (post & delete)

module.exports = userController;
