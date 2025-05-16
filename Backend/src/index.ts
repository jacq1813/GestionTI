import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import incidentRoutes from './routes/incidentRoutes';
import employeeRoutes from './routes/EmployeeRoutes';
import deviceRoutes from './routes/DeviceRoutes';
import componentRoutes from './routes/ComponentRoutes';
import classromRoutes from './routes/ClassromRoutes';
import buildingRoutes from './routes/BuildingRoutes';
import departmentRoutes from './routes/DepartmenRoutes';
import devicesT from './routes/DeviceTRoutes';
import tyclass from './routes/TypesClassroom';
import logRoutes from './routes/LogRoutes';
import ProblemsRoutes from './routes/ProblemsRoutes';
import CauseProblemRoutes from './routes/CauseProblemRoutes';
import SolveProblemRoutes from './routes/SolveProblemRoutes';


const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/incidents', incidentRoutes);
app.use('/employees', employeeRoutes);
app.use('/devices', deviceRoutes);
app.use('/components', componentRoutes);
app.use('/classrooms', classromRoutes);
app.use('/buildings', buildingRoutes);
app.use('/departments', departmentRoutes);
app.use('/devicesT', devicesT);
app.use('/TyClass', tyclass)
app.use('/logs', logRoutes);
app.use('/problems', ProblemsRoutes);
app.use('/Cproblems', CauseProblemRoutes);
app.use('/Sproblems', SolveProblemRoutes);


app.get('/hola', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
