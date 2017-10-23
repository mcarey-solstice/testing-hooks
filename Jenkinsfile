//
pipeline {
    agent any

    stages {
        stage('Build') {
            // Nothing
        }
        stage('Test') {
            steps {
                docker.image('node:latest').run()
                docker.image('node:latest').inside() {
                    npm test
                }
            }
        }
        stage('Deploy') {
            steps {
                docker.image('node:latest').run()
                docker.image('node:latest').inside() {
                    npm install
                }
            }
        }
    }
}
