var mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    description:{
        type: "String",
        required: true
    },
    deadline:{
        type: "String",
        required: true
    },
    status:{
        type:"String"
    },
    worker_name:{
        type: "String",
        required: true
    },
})

var TaskModel = mongoose.model('Task',TaskSchema)
module.exports = TaskModel