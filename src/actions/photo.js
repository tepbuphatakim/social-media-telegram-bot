import { readFile } from '../services/storage.js';

const MIMETYPE = {
  bmp: 'image/bmp',
  jpe: 'image/jpeg',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
};

export async function previewPhoto(req, res, next) {
  try {
    const ext = req.params.path.split('.').at(-1);
    const photo = readFile(req.params.path);
    if (!photo) {
      return res.json();
    }

    res.set('Content-Type', MIMETYPE[ext]).send(photo);
  } catch (error) {
    next(error);
  }
}
