import express from 'express';
import multer from 'multer';

import { listAllPosts, createNewPost, uploadFile, updateNewPost } from '../controllers/postsController.js';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: './uploads', storage });

// for Mac
// const upload = multer({ dest: './uploads', storage });

const routes = (app) => {
  //Permite ao servidor aceitar requisições no formato JSON
  app.use(express.json());
  //Abilitando cors
  app.use(cors(corsOptions));
  //Rota para listar todos os posts
  app.get('/posts', listAllPosts);
  //Rota pra criar um novo post
  app.post('/posts', createNewPost);
  app.post('/upload', upload.single('file'), uploadFile);

  app.put('/upload/:id', updateNewPost);
};

export default routes;
