const Task = require('../models/Tasks');
const asyncWrappper = require('../middleware/async');
const { createCustomeError } = require('../errors/custom-error')

const getAllTasks = asyncWrappper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
}
)

const createTask = asyncWrappper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})

const getTask = asyncWrappper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomeError(`No task with id : ${taskID}`, 404));
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrappper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomeError(`No task with id : ${taskID}`, 404));
    }
    res.status(200).json({ task })
});

const deleteTask = asyncWrappper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomeError(`No task with id : ${taskID}`, 404));
    }
    res.status(200).json({ msg: "Task deleted successfully" });
});

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};