pipeline {
    agent any
    tools {
        nodejs 'Build-In Node'  // Use the appropriate Node.js version here
    }
    environment {
        SONARQUBE_SERVER = 'http://192.168.100.67:9001'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests and Generate Coverage') {
            steps {
                // Run Jest tests and generate coverage
                sh 'npm test -- --coverage'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Run SonarQube analysis
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
    post {
        always {
            // Publish Jest test results to Jenkins
            junit '**/test-results/*.xml'
            // SonarQube should parse the coverage reports after this
            sh 'sonar-scanner -Dsonar.junit.reportPaths=**/test-results/*.xml -Dsonar.javascript.lcov.reportPaths=coverage/lcov-report/index.html'
        }
    }
}