import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import incidentRoutes from './routes/incidentRoutes';


const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/incidents', incidentRoutes);

app.get('/hola', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
