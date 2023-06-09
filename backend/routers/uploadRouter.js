import express from 'express';
import multer from 'multer';
import { isAuth, isAdmin } from '../utils';

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'./backend/uploads/')
  },
  filename: (req,file,cb) => {
    cb(null,file.originalname)
  },
});

const upload = multer({ storage });
const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({ image: `/${req.file.path}` });
});
export default uploadRouter;
