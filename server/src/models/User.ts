import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    picture: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

export const User = mongoose.model('User', UserSchema); 