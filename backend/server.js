import express from 'express';
import routes from './src/routes/postRoutes.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.static('uploads'));

routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
