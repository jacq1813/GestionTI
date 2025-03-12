import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/hola', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
