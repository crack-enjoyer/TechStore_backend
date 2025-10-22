const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('../config/config');

function jwtAuth({ fetchUser = false } = {}) {
  return async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Missing Authorization header' });

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header' });

    const token = parts[1];
    try {
      const payload = jwt.verify(token, config.jwt.secret);
      req.jwtPayload = payload;

      if (fetchUser) {
        try {
          const r = await axios.get(`${config.userServiceUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 2000
          });
          req.userFull = r.data.user;
        } catch (err) {
          console.error('Fetch user failed:', err.message || err);
          return res.status(401).json({ message: 'Failed to validate token with user-service' });
        }
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

module.exports = { jwtAuth };
