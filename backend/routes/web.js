const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
  res.send(express.static(path.join(__dirname, '../../webreact/build/index.html')));
});


module.exports = router;