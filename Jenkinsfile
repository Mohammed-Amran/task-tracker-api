pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mohammed1amran/task-tracker-api:latest'
        JIRA_ISSUE = 'KAN-4'
        JIRA_SITE = 'Task Tracker Jira' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                // Install node dependencies needed to run the server locally
                bat 'npm install'
            }
        }

        stage('Performance Test (JMeter)') {
            steps {
                echo 'Starting Node.js Server in the background...'
                // START THE SERVER: Use 'start /b' to run it in the background on Windows
                bat 'start /b node server.js'
                
                // Give the server 5 seconds to fully start up
                sleep time: 5, unit: 'SECONDS'

                echo 'Running JMeter Performance Test via Docker...'
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'docker run --rm -v "%WORKSPACE%":/workspace -w /workspace justb4/jmeter -n -t performance-test.jmx -l results.jtl'
                }
            }
            post {
                always {
                    perfReport errorFailedThreshold: 0, errorUnstableThreshold: 0, sourceDataFiles: 'results.jtl'
                    // KILL THE SERVER: Clean up so the port isn't blocked for the next build
                    bat 'taskkill /F /IM node.exe'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo 'Building and Pushing Docker Image...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        bat 'docker build -t %DOCKER_IMAGE% .'
                        bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        bat 'docker push %DOCKER_IMAGE%'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline Success! Updating Jira...'
            jiraAddComment site: "${JIRA_SITE}", idOrKey: "${JIRA_ISSUE}", comment: "Success! CI/CD Pipeline completed. Docker image pushed and Performance Tests executed. Build Number: ${env.BUILD_NUMBER}"
        }
        failure {
            echo 'Pipeline Failed! Updating Jira...'
            jiraAddComment site: "${JIRA_SITE}", idOrKey: "${JIRA_ISSUE}", comment: "Pipeline failed at Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
        }
    }
}
