import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/gantt-chart';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB connection with retry logic
const connectWithRetry = () => {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB at:', MONGODB_URI);
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
}); 