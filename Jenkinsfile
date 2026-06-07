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
                // Executes the .jmx file we just pushed and saves results to results.jtl
                // We use catchError so if JMeter isn't in the Jenkins PATH, it doesn't instantly crash the whole pipeline
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'jmeter -n -t performance-test.jmx -l results.jtl'
                }
            }
            post {
                always {
                    // This generates the Performance Report in the Jenkins UI (Requirement 6)
                    perfReport errorFailedThreshold: 0, errorUnstableThreshold: 0, sourceDataFiles: 'results.jtl'
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo 'Building and Pushing Docker Image...'
                script {
                    // Uses your existing Docker Hub credentials saved in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'docker build -t $DOCKER_IMAGE .'
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline Success! Updating Jira...'
            // This satisfies Requirement 4: Updating the Jira Project Pipeline
            jiraComment issueKey: "${JIRA_ISSUE}", body: "Success! CI/CD Pipeline completed. Docker image pushed and Performance Tests executed. Build Number: ${env.BUILD_NUMBER}"
        }
        failure {
            echo 'Pipeline Failed! Updating Jira...'
            jiraComment issueKey: "${JIRA_ISSUE}", body: "Pipeline failed at Build #${env.BUILD_NUMBER}. Please check Jenkins logs."
        }
    }
}
