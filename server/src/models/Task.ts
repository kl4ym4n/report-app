import mongoose from 'mongoose';

const ProgressUpdateSchema = new mongoose.Schema({
    id: String,
    date: Date,
    description: String,
    progress: Number
});

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    startDate: Date,
    endDate: Date,
    progress: Number,
    color: String,
    description: String,
    progressHistory: [ProgressUpdateSchema]
}, {
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

export const Task = mongoose.model('Task', TaskSchema); 