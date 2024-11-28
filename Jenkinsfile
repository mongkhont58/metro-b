pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    credentialsId: 'squ_efe2b828a351e809efcc7c8e449ef50f2c6d1e58', 
                    url: 'https://github.com/mongkhont58/metro-b.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install && npm run build'
            }
        }
    }
}