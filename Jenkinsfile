pipeline {
    agent any

    stages {
        stages {
            stage('Checkout') {
                steps {
                    checkout scmGit(branches: [[name: 'main']], 
                                    userRemoteConfigs: [[url: 'https://github.com/mongkhont58/metro-b.git']])
                }
            }
        }

        stage('Build') {
            steps {
                git 'https://github.com/mongkhont58/metro-b.git'
                sh "npm install"
            }
        }

        stage('Scan') {
            steps {
                withSonarQubeEnv(installationName: 'sq1') {
                    sh "npm install sonar-scanner"
                    sh 'npx sonar-scanner -X -X -Dsonar.projectKey=mywebapp'
                }
            }
        }
    }
}