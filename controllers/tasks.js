const Task = require('../models/Tasks')
const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});
        res.status(200).json({ allTasks });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error })
    }
};

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const singleTask = await Task.findOne({ _id: taskID })
        if (!singleTask) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` });
        }
        res.status(200).json({ singleTask });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateTask = (req, res) => {
    res.send('Update Task')
};

const deleteTask = (req, res) => {
    res.send('Delete Task')
};

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};