import express, { Request, Response } from 'express';
import * as componentService from '../services/ComponentService';

const router = express.Router();

//http://localhost:3001/components
router.get('/', async (_req: Request, res: Response) => {
    const components = await componentService.getComponents();
    res.status(200).send(components);
});

export default router;