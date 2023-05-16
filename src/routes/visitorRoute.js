import express from 'express';
import { addVisitor } from '../controllers/visitorController.js';

const router = express.Router();

router.post('/visitor', addVisitor);

export default router;
