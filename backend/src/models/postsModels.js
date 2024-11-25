import 'dotenv/config'; 
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js';

const dbConnection = await conectarAoBanco(process.env.MONGODB_STRING_CONNECTION);

export async function getAllPosts() {
  const db = dbConnection.db('imersao-backend');
  const collection = db.collection('posts');

  try {
    return collection.find().toArray();
  } catch (error) {
    console.error('Erro ao recuperar os posts do banco de dados:', error);
    return [];
  }
}

export async function createPost(newPost) {
  const db = dbConnection.db('imersao-backend');
  const collection = db.collection('posts');

  try {
    return collection.insertOne(newPost);
  } catch (error) {
    console.error('Erro ao criar o post no banco de dados:', error);
    return null;
  }
}

export async function updatePost(id, newPost) {
  const db = dbConnection.db('imersao-backend');
  const collection = db.collection('posts');
  const objectId = ObjectId.createFromHexString(id);

  try {
    return collection.updateOne({ _id: new ObjectId(objectId) }, { $set: newPost });
  } catch (error) {
    console.error('Erro ao criar o post no banco de dados:', error);
    return null;
  }
}
