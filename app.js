const express = require('express');
const app = express();

// This below enables our API to understand
// the JSON data that is sent within the request to our API:
app.use(express.json());


// Our "Database" (which is just an array):
let tasks = [

             {
                id: 1,
                title: 'Wash Car',
                completed: false,
             },

             {
                id: 2,
                title: 'Go to Butcher',
                completed: false,
             },

            ];


// The Endpoints:

// Endpoint 1: Getting All the Tasks:
app.get('/tasks', (req, res) => {

                                  res.status(200).json(tasks);

                                }
       );


// Endpoint 2: Creating a New Task:
app.post('/tasks', (req, res) => {

                                   const newTask = {

                                                     id: tasks.length + 1,
                                                     title: req.body.title,
                                                     completed: false

                                                   };

                                  // Adding the received task into the Database:
                                  tasks.push(newTask);

                                  // Returning a success Status code:
                                  res.status(201).json(newTask);

                                 }
        );


// Exporting our app, so that it would accessible in the other files:
module.exports = app;