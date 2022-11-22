const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

router.use((req, res) => {
  return res.status(404).send(`Wrong route! Req type: ${req.method}\tReq path: ${req.path}`);
});

module.exports = router;
