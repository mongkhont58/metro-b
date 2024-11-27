pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Configure Node.js in Jenkins (Manage Jenkins > Global Tool Configuration)
    }

    environment {
        SONAR_HOST_URL = 'http://192.168.100.65:9001' // Replace with your SonarQube URL
        SONAR_AUTH_TOKEN = credentials('squ_4b4d2466ea7e3ac0a0bdd7e06f176ae83f055b14')  // Replace with your SonarQube token ID in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'mongkhont58', branch: 'main', url: 'https://github.com/mongkhont58/metro-b.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Coverage Report') {
            steps {
                sh 'npm run test:coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') { // 'SonarQube' must match the name in Jenkins configuration
                    sh '''
                        npx sonar-scanner \
                        -Dsonar.projectKey=my-nextjs-app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
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
