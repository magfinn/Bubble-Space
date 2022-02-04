const router = require('express').Router();
const {} = require('../../controllers/user-controllers');

//Set up GET all and POST at /api/thoughts
router.route('/').get().post();

//set up GET one, PUT and DELETE at /api/thoughts/:id
router.route('/:id').get().put().delete();

//set up POST and DELETE at /api/thoughts/:id/reactions
router.route('/:id/reactions').get().post().delete();

module.exports = router;
