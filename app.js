const express = require('express');
const app = express();
const port = 4000;
const tasks = require('./routes/tasks');
const connectDb = require('./DB/connect');
require('dotenv').config();
//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening at ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();