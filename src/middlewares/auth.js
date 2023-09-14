import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export function authentication(req, res, next) {
  try {
    const { Authorization } = req.headers;
    if (!Authorization) {
      res.status(401).json({ message: 'Authorization header required' });
    }
    const payload = jwt.verify(Authorization.split(' ')[1], JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
