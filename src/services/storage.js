import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.resolve(__dirname, '../../', 'storages');

export function readFile(fileName) {
  return fs.readFileSync(path.resolve(storagePath, fileName));
}

export async function saveFileFromURL(url) {
  const file = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  const fileName = random(32);
  const fileExt = url.href.split('.').at(-1);
  return writeFile(file.data, `${fileName}.${fileExt}`);
}

export function deleteFile(fileName) {
  if (!fileName || !fs.existsSync(path.resolve(storagePath, fileName))) {
    return false;
  }
  return fs.unlinkSync(path.resolve(storagePath, fileName));
}

function writeFile(fileBuffer, fileName) {
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, {
      recursive: true,
    });
  }
  fs.writeFileSync(path.resolve(storagePath, fileName), fileBuffer);
  return fileName;
}

function random(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
