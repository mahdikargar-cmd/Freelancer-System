import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback): void => {
  const filetypes = /jpeg|jpg|png|pdf|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size (e.g., 10MB)
  fileFilter: (req: Request, file, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  },
});

export default upload;
