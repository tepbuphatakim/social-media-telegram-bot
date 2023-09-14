import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export async function login(req, res, next) {
  try {
    const token = jwt.sign({ id_user: 1 }, JWT_SECRET_KEY);
    res.send(token);
  } catch (error) {
    next(error);
  }
}
