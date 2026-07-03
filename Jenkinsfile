pipeline {

    agent any

    stages {

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t end-to-end-devops-pipeline:v1 .'
            }
        }

        stage('Run Test Container') {
            steps {
                sh '''
                docker rm -f test-container || true
                docker run -d \
                  --name test-container \
                  -p 3001:3000 \
                  end-to-end-devops-pipeline:v1
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

        stage('Cleanup') {
            steps {
                sh '''
                docker stop test-container
                docker rm test-container
                '''
            }
        }

    }

    post {

        success {
            echo 'Application verified successfully.'
        }

        always {
            sh 'docker rm -f test-container || true'
        }

    }

}
