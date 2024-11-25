import { getAllPosts, createPost, updatePost } from '../models/postsModels.js';
import gerarDescricaoComGemini from '../services/geminiService.js';
import fs from 'fs';

export async function listAllPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao recuperar os posts:', error);
    res.status(500).json({ message: 'Erro ao recuperar os posts' });
  }
}

export async function createNewPost(req, res) {
  try {
    const newPost = req.body;
    const createdPost = await createPost(newPost);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error('Erro ao criar o post:', erro.message);
    res.status(500).json({ message: 'Erro ao criar o post' });
  }
}

export async function uploadFile(req, res) {
  const newFile = {
    descricao: req.body.descricao,
    imgUrl: req.file.originalname,
    alt: ''
  };
  try {
    const createdFile = await createPost(newFile);
    const updatedFile = `uploads/${createdFile.insertedId}.png`;
    fs.renameSync(req.file.path, updatedFile);
    res.status(200).json(createdFile);
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
    res.status(500).json({ message: 'Erro ao enviar o arquivo' });
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const imgUrl = `http://localhost:5555/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const updatedPost = {
      descricao: descricao,
      imgUrl: imgUrl,
      alt: req.body.alt
    };
    const createdPost = await updatePost(id, updatedPost);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error('Erro ao criar o post:', erro.message);
    res.status(500).json({ message: 'Erro ao criar o post' });
  }
}
