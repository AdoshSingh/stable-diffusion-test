import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './lib/db';
import imageRouter from './routes/image';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}))

const mongoURI = process.env.MONGO_URI || '';
database.connect(mongoURI);

const port = 8000;

app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

app.use('/api', imageRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
