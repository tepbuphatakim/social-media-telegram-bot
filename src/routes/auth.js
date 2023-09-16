import { Router } from 'express';
import { login } from '../actions/auth.js';

const router = new Router();

router.post('/login', login);

export default router;
