pipeline {

    agent any

    environment {
        IMAGE_NAME = "end-to-end-devops-pipeline:v1"
        NAMESPACE = "devops-pipeline"
    }

    stages {

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
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
                curl http://localhost:3001/health
                '''
            }
        }

        stage('Cleanup Test Container') {
            steps {
                sh '''
                docker rm -f test-container || true
                '''
            }
        }

        stage('Load Image into Minikube') {
            steps {
                sh '''
                sudo -u div minikube image load ${IMAGE_NAME}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                sudo -u div kubectl apply -f kubernetes/
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                sudo -u div kubectl rollout status deployment/devops-app -n ${NAMESPACE}
                '''
            }
        }

        stage('Show Running Pods') {
            steps {
                sh '''
                sudo -u div kubectl get pods -n ${NAMESPACE}
                '''
            }
        }

        stage('Show Services') {
            steps {
                sh '''
                sudo -u div kubectl get svc -n ${NAMESPACE}
                '''
            }
        }

    }

    post {

        success {

            echo '========================================'
            echo 'CI/CD Pipeline Completed Successfully!'
            echo 'Docker Image Built'
            echo 'Application Tested'
            echo 'Image Loaded into Minikube'
            echo 'Application Deployed to Kubernetes'
            echo '========================================'

        }

        failure {
            echo 'Pipeline Failed!'
        }

        always {

            sh '''
            docker rm -f test-container || true
            '''

        }

    }

}
