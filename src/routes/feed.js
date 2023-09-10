import { Router } from 'express';
import { getAll, deleteById } from '../actions/feed.js';

const router = new Router();

router.get('/', getAll);
router.delete('/:id', deleteById);

export default router;
