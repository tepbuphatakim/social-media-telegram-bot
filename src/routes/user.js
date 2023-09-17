import { Router } from 'express';
import { getAll, getById, deleteById } from '../actions/user.js';

const router = new Router();

router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', deleteById);

export default router;
