pipeline {
    agent any
    tools  {
        nodejs 'nodejs16'
    }

    stages {
        stage('Dependcies install') {
            when {
                branch "PR-*"
            }
            steps {
                sh 'npm install'
            }
        }
    }
}
