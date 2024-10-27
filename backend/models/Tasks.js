// models/Tasks.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'incomplete'],
        default: 'pending'
    },
    worker_name: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);