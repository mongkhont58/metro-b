pipeline {
    agent any

    tools {
        nodejs "Build-In Node"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'squ_efe2b828a351e809efcc7c8e449ef50f2c6d1e58', url: 'https://github.com/mongkhont58/metro-b.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    which npm || echo "npm not found"
                    npm install
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}