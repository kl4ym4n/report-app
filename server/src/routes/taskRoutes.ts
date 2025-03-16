import express from 'express';
import { taskController } from '../controllers/taskController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Добавляем middleware auth ко всем роутам
router.use(auth);

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router; 