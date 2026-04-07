pipeline {
    // This command below, tells Jenkins that it can run on any available agent
    agent any

    // We'll define our variables here, so that we won't retype them again later:
    environment {
        
                 DOCKERHUB_USER = "mohammed1amran" 
                 IMAGE_NAME = "${DOCKERHUB_USER}/task-tracker-api"
                
                }

    stages {

            // STAGE 1: Pulling the latest code from GitHub:
            stage('1. Checkout Code') {

                                        steps {
                                                   
                                                echo 'Pulling the latest code from GitHub...'
                                                // 'checkout scm' automatically uses the GitHub link that we will give to it Jenkins later
                                                checkout scm 

                                              }

                                      } // Closing brace of Stage 1.
    
            // STAGE 2: Building the Docker Image:
            stage('2. Build Docker Image') {

                                            steps {

                                                   echo 'Building the Docker Image with secure Firebase key...'
                                                   
                                                   // Securely pulling the file from Jenkins vault and assigning its path to FIREBASE_FILE:
                                                   withCredentials(
                                                    
                                                                   [

                                                                    file(

                                                                         credentialsId: 'firebase-secret-file', 
                                                                         
                                                                         variable: 'FIREBASE_FILE'
                                                                        
                                                                        )

                                                                   ]
                                                                 
                                                                 ) {

                                                                    // 1. Copying the hidden vault file into our working folder,
                                                                    //    and naming it exactly what that app.js file expects:
                                                                    bat 'copy "%FIREBASE_FILE%" firebase-key.json'

                                                                    // 2. Building the Docker Image:
                                                                    bat 'docker build -t %IMAGE_NAME%:latest .'

                                                                    // 3. Deleting the key from the Jenkins workspace immediately (for security reasons):
                                                                    bat 'del firebase-key.json'

                                                                   } // Closing brace of 'withCredential()'.                                                   
                                                                                                  
                                                 }

                                           } // Closing brace of Stage 2.
    
            // STAGE 3: Running the Automated Tests:
            stage('3. Run Tests') {
                                    
                                    steps {

                                              echo 'Running automated tests inside the container...'
                                              // The '--rm' flag tells Docker to delete this temporary test container immediately after finishing
                                              bat 'docker run --rm %IMAGE_NAME%:latest npm test'
                                          
                                          }

                                  } // Closing brace of Stage 3.
    
            // STAGE 4: Pushing to Docker Hub:
            stage('4. Push to Docker Hub') {
                                              
                                            steps {

                                                    echo 'Tests passed! Pushing image to Docker Hub...'
                                                    // This securely grabs the 'docker-hub-credentials' you saved earlier!
                                                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                                                        // Log in to Docker Hub using the hidden variables
                                                        bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                                                        // Push the shiny new image to the cloud
                                                        bat 'docker push %IMAGE_NAME%:latest'
                                                    }

                                                  }

                                          } // Closing brace of Stage 4.

    } // Closing brace of the Stages.

} // Closing brace of the pipeline.