pipeline {
    agent any
    tools  {
        nodejs 'nodejs16'
    }
    
    environment {
    SCANNER_HOME = tool 'sonar-scanner'
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
        stage('Code Anylasis') {
            when {
                branch "PR-*"
            }
           steps {
              withSonarQubeEnv('qube') {
                sh '$SCANNER_HOME/bin/sonar-scanner'
              }
                }       
          }
    }
}
