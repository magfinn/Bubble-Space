const { Thought } = require('../models');

const thoughtController = {
    //the function will go in here as methods

    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //GET thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            //if no thought, send 404 error
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //POST new thought(push the created thought's _id to the associated user's thoughts array field)
        // example data
        // {
        //   "thoughtText": "Here's a cool thought...",
        //   "username": "lernantino",
        //   "userId": "5edff358a0fcb779aa7b118b"
        // }
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },

    //PUT update thought by _id
    //{ new: true } tells mongoose to return the new value
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'no thought found by this ID' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //DELETE thought by _id
    deleteThoughtById({ params, body }, res) {
            Thought.findOneAndDelete({ _id: params.id}, body, { new: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'no thought found by this ID' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        },

    // ('/:thoughtId/reactions')
    //POST new reaction stored in a single thought's reactions array field

    //DELETE reaction by reactionId

};

module.exports = thoughtController;