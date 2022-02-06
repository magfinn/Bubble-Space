const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  postNewThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controllers');

//Set up GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(postNewThought);

//set up GET one, PUT and DELETE at /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//set up POST at /api/thoughts/:id/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//set up DELETE at /api/thoughts/:id/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
