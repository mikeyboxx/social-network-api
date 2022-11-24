const {User, Thought} = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // get all users and sort by _id
  getUsers(req, res) {
    User.find()
      .sort({_id: 1})
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },

  // get one user by userId, and return all associated thoughts and friends documents
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')  // Thought model
      .populate('friends')   // User model
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },

  // create user with contents of req.body, containing fields from User schema
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },

  // update user with contents of req.body, containing fields from User schema
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }  // return updated document
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user) 
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete user by userId, then delete all thoughts for that user
  // remove that user from all existing friends lists
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(async (user) => {
        if (!user) res.status(404).json({ message: 'No user with that ID' });
        
        await Thought.deleteMany({ username: user.username });

        await User.updateMany({ $pull: { friends: ObjectId(user._id) } });

        return res.json({user, message:`User and all of this thoughts have been deleted. He has also been removed from all friends lists!!!`});
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },

  // add user to friends collection
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: {friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },

  // delete friend from users friends collection
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: ObjectId(req.params.friendId)} },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },
};
