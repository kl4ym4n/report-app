import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/auth';

export const taskController = {
    async getAllTasks(req: AuthRequest, res: Response) {
        try {
            const tasks = await Task.find({ userId: req.user.userId });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks', error });
        }
    },

    async createTask(req: AuthRequest, res: Response) {
        try {
            const task = new Task({
                ...req.body,
                userId: req.user.userId
            });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error });
        }
    },

    async updateTask(req: AuthRequest, res: Response) {
        try {
            const task = await Task.findOneAndUpdate(
                { id: req.params.id, userId: req.user.userId },
                req.body,
                { new: true }
            );
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error });
        }
    },

    async deleteTask(req: AuthRequest, res: Response) {
        try {
            const task = await Task.findOneAndDelete({ 
                id: req.params.id, 
                userId: req.user.userId 
            });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error });
        }
    }
}; 