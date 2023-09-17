import { Router } from 'express';
import { previewPhoto } from '../actions/photo.js';

const router = new Router();

router.get('/:path', previewPhoto);

export default router;
