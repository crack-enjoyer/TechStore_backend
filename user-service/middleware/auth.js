const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../db/init');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const user = await User.findByPk(payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err });
  }
}

module.exports = { authenticateToken };