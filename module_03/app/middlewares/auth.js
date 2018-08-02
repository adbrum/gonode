const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const {promisify} = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).jsonp({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).jsonp({ error: 'Token error' });
  }

  const [scheme, token] = parts;
  
  if (scheme !== 'Bearer') {
    return res.status(401).jsonp({ error: 'Token malformatted' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).jsonp({ error: 'Token invalide' });
  }
};