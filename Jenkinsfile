//

node('master') {
    docker('node:latest').run()
    docker('node:latest').inside() {
        npm install
    }
}

// Jenkinsfile
