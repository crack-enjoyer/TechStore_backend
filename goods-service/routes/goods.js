const express = require('express');
const { body } = require('express-validator');
const { createGood, listGoods } = require('../controllers/goodsController');
const { jwtAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', listGoods);

router.post('/',
  jwtAuth({ fetchUser: true }), // require token and validate user via user-service
  [ body('name').isString().notEmpty(), body('price').isFloat({ gt: 0 }) ],
  createGood
);

module.exports = router;
