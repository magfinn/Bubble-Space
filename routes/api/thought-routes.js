const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReactionById,
} = require('../../controllers/thought-controller');

//set up GET and POST at /api/thoughts

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//set up GET one, PUT and DELETE at /api/thoughts/:id

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);

// ('/:thoughtId/reactions')
//POST new reaction stored in a single thought's reactions array field
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReactionById);


module.exports = router;