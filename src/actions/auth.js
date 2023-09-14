import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const { JWT_SECRET_KEY } = process.env;

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({
      where: {
        email,
        password,
      },
    });
    const token = jwt.sign({ admin }, JWT_SECRET_KEY, { expiresIn: '24h' });
    res.send(token);
  } catch (error) {
    next(error);
  }
}
