// This comment is to test if the Automation works perfectly.

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

                                                     id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                                                     title: req.body.title,
                                                     completed: false

                                                   };

                                  // Adding the received task into the Database:
                                  tasks.push(newTask);

                                  // Returning a success Status code:
                                  res.status(201).json(newTask);

                                 }
        );


// Endpoint 3: Deleting all the tasks that their 'completed' status is TRUE:
app.delete('/tasks/completed', (req, res) => {

                                               // I. We will filter the array to only keep
                                               //    the tasks that their 'completed' is
                                               //    not set to TRUE:
                                               tasks = tasks.filter(t => t.completed === false);

                                               // II. Returning a success status code:
                                               res.status(200).json(
                                                                    
                                                                    {

                                                                     message: 'All completed tasks have been successfully deleted.'

                                                                    }

                                                                   );

                                             }
          );

// Endpoint 4: Updating a task's status to TRUE using the task ID:
app.put('/tasks/:id', (req, res) => {

                                     // I. Extracting the ID from the URL,
                                     //    And converting it to a number:
                                     const taskId = parseInt(req.params.id);

                                     // II. Finding the specifc task in our database:
                                     const task = tasks.find(t => t.id === taskId);

                                     // III. Updating the 'completed' task status to TRUE:

                                     // III.I Handling if the task doesn't exist:
                                     if(!task){

                                               return res.status(404).json(
                                                 
                                                                           {

                                                                            message: `Task with ID ${taskId} not found`
                                                 
                                                                           }
                                                  
                                                                          );                                     

                                              }

                                     // III.II Otherwise:
                                     task.completed = true;

                                     // IV. Returning a success status:
                                     res.status(200).json(
                                       
                                                          {

                                                            message: 'Task marked as completed!', task: task

                                                          }
                                        
                                                         );

                                    }
       );


// Endpoint 5: Deleting a specific task via the ID:
app.delete('/tasks/:id', (req, res) => {

                                        // I. Extracting the ID from the URL,
                                        //    And converting it to a number:
                                        const taskId = parseInt(req.params.id);
   
                                        // II. Finding the specifc task in our database:
                                        const task = tasks.find(t => t.id === taskId);
   
                                        // III. Deleting the task:
   
                                        // III.I Handling if the task doesn't exist:
                                        if(!task){
   
                                                  return res.status(404).json(
                                                    
                                                                              {
   
                                                                               message: `Task with ID ${taskId} not found`
                                                    
                                                                              }
                                                     
                                                                             );                                     
   
                                                 }

                                        // III.II Otherwise:
                                        tasks = tasks.filter(t => t.id !== taskId);

                                        // IV. Returning a success status:
                                        res.status(200).json(
                                           
                                                             {

                                                               message: `Task with ID ${taskId} has been deleted.`

                                                             }
                                           
                                                            );
   
                                       }
          );


// Exporting our app, so that it would accessible in the other files:
module.exports = app;