# Task Tracker API 📝✅
A Task Tracker Backend System built using Node.js (Express JS) and Firestore Database.

## Importance of this System
This is a ready to use complete Backend System buil with Express JS that
runs within Node.js (as a runtime environment for JS Code).
This backend system is connected to a Jenkins (CI/CD tool) pipeline that
detects any changes within this GitHub Repository and triggers a pipeline
that test's this backend for any issues.
Upon successfull build of the system, the pipleine will save a 
Docker Image of the Backend System and will push a Containerized version 
of the Image up to the Docker Hub.

## Features
- Create Task's
- Get the list of all created Task's
- Mark Task's as completed
- Delete completed Task's
- Delete specific Task's

## Technologies
- Node.js
- Express JS 
- Jenkins 🏭⛓️🛠️
- Docker 🐋
- Firebase (Firestore Database) 🔥

## Screenshots

![GET](screenshots/1.HTTP_GET.png)

![POST](screenshots/2.HTTP_POST.png)

![RESULT OF POST](screenshots/3.RESULT_OF_HTTP_POST.png)

![5. SELECTING TASK ID FOR UPDATE](screenshots/5.SELECTING_TASK_ID_FOR_UPDATE.png)

![6. PUT](screenshots/6.HTTP_PUT_USING_TASK_ID.png)

![7. RESULT OF PUT](screenshots/7.RESULT_OF_HTTP_PUT.png)

![9 SELECTING TASK ID FOR DELETE](screenshots/9.SELECTING_TASK_ID_FOR_DELETE.png)

![10 DELETE BASED ON ID](screenshots/10.HTTP_DELETE_BASED_ON_TASK_ID.png)

![11 RESULT OF HTTP DELETE BASED ON ID](screenshots/11.RESULT_OF_HTTP_DELETE.png)

![12 DELETE](screenshots/12.HTTP_DELETE_USING_COMPLETED_ENDPOINT.png)

![13 RESULT OF DELETE](screenshots/13.RESULT_OF_HTTP_DELETE_USING_COMPLETED_ENDPOINT.png)

![14 FINAL GET](screenshots/14.FINAL_HTTP_GET_AGAIN.png)

![Jenkins 1](screenshots/jenkins_one.png)

![Jenkins 2](screenshots/jenkins_two.png)


## How to Run the APP
1. Clone this project.
2. Run Docker Engine.
3. Run the command 'Node app.js' on the command line.
4. Use 'Insomnia'/Postman to test the API endpoints.
## Recommendation:
Feel free to create an Interactive Web UI or App for this Backend - and Contact Me! 😊
