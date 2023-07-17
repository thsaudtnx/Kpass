const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', async (req, res, next) => {
  res.send(express.static(path.join(__dirname, '../../webreact/build/index.html')));
});


module.exports = router;