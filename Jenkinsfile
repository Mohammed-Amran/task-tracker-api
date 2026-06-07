pipeline {
    agent any

    environment {
        // Your Docker Hub image repository
        DOCKER_IMAGE = 'mohammed1amran/task-tracker-api:latest'
        // The Jira Issue we are updating
        JIRA_ISSUE = 'KAN-4'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Performance Test (JMeter)') {
            steps {
                echo 'Running JMeter Performance Test...'
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    // Changed 'sh' to 'bat' for Windows, and explicitly called jmeter.bat
                    bat 'jmeter.bat -n -t performance-test.jmx -l results.jtl'
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
                        // Changed 'sh' to 'bat' and used Windows %VAR% syntax
                        bat 'docker build -t %DOCKER_IMAGE% .'
                        bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
                        bat 'docker push %DOCKER_IMAGE%'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline Success! Updating Jira...'
            // Changed 'jiraComment' to 'jiraAddComment'
            jiraAddComment idOrKey: "${JIRA_ISSUE}", comment: "✅ Success! CI/CD Pipeline completed. Docker image pushed and Performance Tests executed. Build Number: ${env.BUILD_NUMBER}"
        }
        failure {
            echo 'Pipeline Failed! Updating Jira...'
            jiraAddComment idOrKey: "${JIRA_ISSUE}", comment: "❌ Pipeline failed at Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
        }
    }
}
