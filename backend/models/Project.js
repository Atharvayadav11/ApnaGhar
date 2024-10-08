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
        type: String,
        required: true
    },
    deadline: {
        type: String
    }
});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
