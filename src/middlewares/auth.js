import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Authorization header required' });
    }

    const payload = jwt.verify(authorization.split(' ')[1], JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
