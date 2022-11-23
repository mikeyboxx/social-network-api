const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

  // /api/users/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/users/:userId/friends/:friendId
router.route('/:thoughtId/reactions/')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')  
  .delete(deleteReaction);

module.exports = router;
