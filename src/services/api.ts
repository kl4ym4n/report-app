import { Task } from '../components/GanttChart/GanttChart';

const API_URL = 'http://localhost:3001/api';

const transformTask = (task: any): Task => ({
    ...task,
    startDate: new Date(task.startDate),
    endDate: new Date(task.endDate),
    progressHistory: task.progressHistory.map((update: any) => ({
        ...update,
        date: new Date(update.date)
    }))
});

const getAuthHeader = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        return tasks.map(transformTask);
    },

    async createTask(task: Task): Promise<Task> {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        const newTask = await response.json();
        return transformTask(newTask);
    },

    async updateTask(task: Task): Promise<Task> {
        const response = await fetch(`${API_URL}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const updatedTask = await response.json();
        return transformTask(updatedTask);
    },

    async deleteTask(taskId: string): Promise<void> {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    }
}; 