import express from 'express';
import { verifyToken } from '../controllers/AuthController.js';
import { formDetail, getAllSubmittedForm, submitForm } from '../controllers/ContactController.js';
const ContactRouter = express.Router();

ContactRouter.post('/submit', verifyToken , submitForm);
ContactRouter.get('/allforms', verifyToken , getAllSubmittedForm);
ContactRouter.get('/forms/:id', verifyToken , formDetail);


export default ContactRouter;