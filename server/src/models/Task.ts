import mongoose from 'mongoose';

const ProgressUpdateSchema = new mongoose.Schema({
    id: String,
    date: Date,
    description: String,
    progress: Number
});

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id: String,
    name: String,
    startDate: Date,
    endDate: Date,
    progress: Number,
    color: String,
    description: String,
    progressHistory: [ProgressUpdateSchema]
});

export const Task = mongoose.model('Task', TaskSchema); 