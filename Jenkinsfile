pipeline {

    agent any

    environment {
        IMAGE_NAME = "end-to-end-devops-pipeline:v1"
        NAMESPACE = "devops-pipeline"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Verify Kubernetes') {
            steps {
                sh '''
                kubectl version --client
                kubectl cluster-info
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME} .
                '''
            }
        }

        stage('Run Test Container') {
            steps {
                sh '''
                docker rm -f test-container || true

                docker run -d \
                  --name test-container \
                  -p 3001:3000 \
                  ${IMAGE_NAME}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5

                curl --fail http://localhost:3001/health
                '''
            }
        }

        stage('Cleanup Test Container') {
            steps {
                sh '''
                docker stop test-container
                docker rm test-container
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f kubernetes/
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl rollout status deployment/devops-app -n ${NAMESPACE}

                kubectl get deployments -n ${NAMESPACE}

                kubectl get pods -n ${NAMESPACE}

                kubectl get svc -n ${NAMESPACE}
                '''
            }
        }

    }

    post {

        success {
            echo 'CI/CD Pipeline executed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {

            sh '''
            docker rm -f test-container || true
            '''

        }

    }

}
