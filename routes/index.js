const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// invalid request
router.use((req, res) => {
  return res.status(404).send(`Wrong route! \n${req.method} --- ${req.path}`);
});

module.exports = router;
