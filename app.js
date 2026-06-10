
const express = require('express');
const admin = require('firebase-admin');

// 1. Loading the secret key:
const serviceAccount = require('./firebase-key.json');

// 2. Initializing Firebase:
admin.initializeApp(
                    
                    {credential: admin.credential.cert(serviceAccount)}
                  
                  );

// 3. Connect to our Firestore Database:
const database = admin.firestore();

// 4. Using Express JS Framework:
const app = express();

// 5. This below enables our API to understand
//    the JSON data that is sent within the request to our API:
app.use(express.json());


// The Endpoints:

// VANYA: I redefined the get RESTful endpoint
// Endpoint 1: Getting All the Tasks:
app.get('/tasks', async (req, res) => {

                                       try{

                                           const snapshot = await database.collection('tasks').get();

                                           const tasks = [];

                                           // Looping through the Firestore document
                                           // and pushing it into our 'tasks' array:
                                           snapshot.forEach(

                                                            doc => {

                                                                    tasks.push(
                                                                     
                                                                               {
 
                                                                                id: doc.id,
                                                                                ...doc.data()

                                                                               }
                                                                      
                                                                              );

                                                                   }

                                                           );

                                             // Returning a success status code:
                                             res.status(200).json(tasks);

                                          }
                                          catch (e) {

                                                     res.status(500).json(
                                                      
                                                                          {

                                                                           error: e.message

                                                                          }

                                                                         );

                                                    }

                                      }
       );


// Zhyar Nasr , i redefined the post RESTful endpoint

app.post('/tasks', async (req, res) => {

                                        try{

                                            // 1. Receiving the task title and wrapping it into a map:
                                            const newTask = {

                                                             title: req.body.title,
                                                             completed: false

                                                            };

                                            // 2. Adding the task to the Firestore database:
                                            const docRef = await database.collection('tasks').add(newTask);

                                            // 3. Returning a success status code:
                                            res.status(200).json(

                                                                  {

                                                                    id: docRef.id,
                                                                    ...newTask

                                                                  }

                                                                );

                                           }
                                           catch (e) {

                                                       res.status(500).json(

                                                                            {

                                                                              error: e.message

                                                                            }

                                                                           );

                                                     }

                                       }
        ); 

// Banu: I redefined the DELET endpoint
// Endpoint 3: Deleting all the tasks that their 'completed' status is TRUE:
app.delete('/tasks/completed', async (req, res) => {

                                                     try{

                                                         // 1. Getting all the tasks from the database
                                                         //    that their 'completed' is == true:
                                                         const snapshot = await database.collection('tasks').where('completed', '==', true).get();

                                                         if(snapshot.empty){

                                                                             return res.status(200).json(

                                                                                                          {

                                                                                                            message: 'No completed tasks found to be deleted! .'

                                                                                                          }

                                                                                                        );

                                                                           }

                                                        // 2. Delete the tasks that their 'completed' field
                                                        //    is == true, from the database:

                                                        // NOTE: Firestore requires us to delete the documents one by one using
                                                        //       a "Batch", thats why I have added the below code:
                                                        const batch = database.batch();

                                                        snapshot.docs.forEach(

                                                                               (doc) => {

                                                                                         batch.delete(doc.ref);

                                                                                        }

                                                                             );

                                                       await batch.commit();

                                                       // 3. Returning a success response code:
                                                       res.status(200).json(
                                                         
                                                                            {

                                                                              message: 'All completed tasks have been successfully deleted.'

                                                                            }
                                                          
                                                                           );

                                                        }
                                                        catch(e) {

                                                                  res.status(500).json(

                                                                                       {

                                                                                        error: e.message

                                                                                       }

                                                                                      );

                                                                 }

                                                   } 
          );


//Banu: I redefined the PUT endpoint
// Endpoint 4: Updating a task's 'completed' field status to TRUE using the task ID:
app.put('/tasks/:id', async (req, res) => {

                                            try{

                                                // 1. Getting the taskId:
                                                const taskId = req.params.id;

                                                // 2. Getting the document path that contains the required task to be updated:
                                                const taskRef = database.collection('tasks').doc(taskId);

                                                // 3. Updating the 'completed' field status to TRUE:
                                                await taskRef.update(

                                                                     {

                                                                      completed: true

                                                                     }

                                                                    );

                                                // 4. Returning a success status code:
                                                res.status(200).json(

                                                                      {

                                                                        message: `Task ${taskId} marked as completed`

                                                                      }

                                                                    );

                                               }
                                               catch (e) {

                                                          res.status(404).json(

                                                                                {

                                                                                 message: `Task not found or update failed: ${e.message}`

                                                                                }

                                                                              );

                                                         }

                                          }
       );

// Endpoint 5: Deleting a specific task via the ID:
app.delete('/tasks/:id', async (req, res) => {

                                              try{

                                                  // 1. Getting the task Id:
                                                  const taskId = req.params.id;

                                                  // 2. Getting the document path that contains the required tasks to be deleted:
                                                  const taskRef = database.collection('tasks').doc(taskId);

                                                  // 3. Deleting the document that contains the required task from the Database:
                                                  await taskRef.delete();

                                                  // 4. Returning a success status code:;
                                                  res.status(200).json(

                                                                       {

                                                                        message: `Task ${taskId} has been deleted from the database.`

                                                                       }

                                                                      );

                                                 }
                                                 catch(e){

                                                          res.status(500).json(

                                                                               {

                                                                                 error: e.message

                                                                               }

                                                                              );

                                                         }
   
                                             }
          );


// Exporting our app, so that it would accessible in the other files:
module.exports = app;
