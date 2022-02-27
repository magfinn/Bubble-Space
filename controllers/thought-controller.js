const { Thought, User } = require('../models');

const thoughtController = {
    //the function will go in here as methods

    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //GET thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
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
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found by this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },

    //PUT update thought by _id
    //{ new: true } tells mongoose to return the new value
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
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
    deleteThoughtById({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID' })
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $pull: { thoughts: params.Id }},
                    { new: true }
                )
            })
            .catch(err => res.status(400).json(err));
        },

    //Add new reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
                {_id: params.thoughtId}, 
                {$push: {reactions: body}}, 
                {new: true, runValidators: true})
            .populate({
                path: 'reactions', 
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    // Delete reaction by id
    deleteReactionById({ params }, res) {
        Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found by this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
      }
    
};


module.exports = thoughtController;