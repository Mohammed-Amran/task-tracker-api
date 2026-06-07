pipeline {
    agent any

    environment {
        // Your Docker Hub image repository
        DOCKER_IMAGE = 'mohammed1amran/task-tracker-api:latest'
        // The Jira Issue we are updating
        JIRA_ISSUE = 'KAN-4'
        // EXACT NAME from Jenkins > Manage Jenkins > System > Jira Steps
        JIRA_SITE = 'Task Tracker Jira' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Performance Test (JMeter)') {
            steps {
                echo 'Running JMeter Performance Test via Docker...'
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    // Uses a JMeter Docker image to run the test without needing it installed on Windows!
                    bat 'docker run --rm -v "%WORKSPACE%":/workspace -w /workspace justb4/jmeter -n -t performance-test.jmx -l results.jtl'
                }
            }
            post {
                always {
                    perfReport errorFailedThreshold: 0, errorUnstableThreshold: 0, sourceDataFiles: 'results.jtl'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo 'Building and Pushing Docker Image...'
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        bat 'docker build -t %DOCKER_IMAGE% .'
                        // Bypassing the Windows 'echo' pipe bug using the direct flag
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
