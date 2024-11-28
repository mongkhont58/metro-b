pipeline {
    agent any

    tools {
        nodejs "Build-In Node"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'squ_6f123cd1dfe2c9e05bb3d3ce28830716aaed9fe6', url: 'https://github.com/mongkhont58/metro-b.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    which npm || echo "npm not found"
                    npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Scan') {
            steps {
                withSonarQubeEnv(installationName: 'sq1') {
                    sh "npm install sonar-scanner --legacy-peer-deps"
                    sh 'npx sonar-scanner -X -X -D sonar.projectKey=my-nextjs-app'
                }
            }
        }
    }
}