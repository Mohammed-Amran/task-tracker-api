/* This file will automatically start our app, and will
   automatically send a GET request to /tasks, and it will
   check if it will return a 200 status code and an array or NOT!.
*/

const request = require('supertest');
const app = require('./app.js');

describe('Task Tracker API', () => {

                                    it('should return a list of tasks and a 200 status code', async() => {

                                                                                                          const response = await request(app).get('/tasks');

                                                                                                          expect(response.statusCode).toBe(200);
                                                                                                          expect(Array.isArray(response.body)).toBeTruthy();
                                                                                                          expect(response.body.length).toBeGreaterThan(0);

                                                                                                         }
                                      );
     
                                   }
        );