pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git 'https://github.com/aeff60/simple-express-app.git'
                sh 'npm install'
            }
        }

        stage('Scan') {
            steps {
                withSonarQubeEnv('sq1') {
                    sh 'npm install sonar-scanner'
                    sh '''
                        npx sonar-scanner \
                        -Dsonar.projectKey=mywebapp \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }
    }
}