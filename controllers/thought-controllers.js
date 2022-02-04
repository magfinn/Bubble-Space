const { Thought } = require('../models');
const router = require('../routes');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get a single thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'We could not find a thought by that ID.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //post new thought
  // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  postNewThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },

  //update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'We could not find a thought matching that id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'We could not find a thought matching that id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

//api/thoughts/:thoughtId/reactions (post & delete)

module.exports = thoughtController;
