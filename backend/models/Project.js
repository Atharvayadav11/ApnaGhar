var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    workers: {
        type: [String]
    },
    budget: {
        flooring: { type: Number, required: true },
        plumbing: { type: Number, required: true },
        wiring: { type: Number, required: true },
        painting: { type: Number, required: true },
        furniture: { type: Number, required: true },
        total: { type: Number, required: true }
    },
    deadline: {
        type: String
    },
    budget_spent:{
        type:Number
    }
    
},{timestamps:true});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
