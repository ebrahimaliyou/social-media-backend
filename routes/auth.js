import express from 'express';
import { login } from '../controllers/auth.js';

// create a router object
const router = express.Router(); 

router.post('/login', login);

export default router;