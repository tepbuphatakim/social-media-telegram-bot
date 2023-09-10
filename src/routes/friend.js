import { Router } from 'express';
import { getAll } from '../actions/friend.js';

const router = new Router();

router.get('/', getAll);

export default router;
