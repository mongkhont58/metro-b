pipeline {
    agent any

    tools {
        nodejs 'Built-In Node' // Ensure Node.js is configured in Jenkins (Manage Jenkins > Global Tool Configuration)
    }

    environment {
        NODE_ENV = 'production' // Set the environment for Node.js
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'squ_efe2b828a351e809efcc7c8e449ef50f2c6d1e58', url: 'https://github.com/mongkhont58/metro-b.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Linter') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy (Optional)') {
            when {
                branch 'main' // Deploy only from the main branch
            }
            steps {
                echo 'Deploy step placeholder. Add your deployment script or commands here.'
                // Example deployment command:
                // sh './deploy.sh'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
