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
                branch "dependabot/npm_and_yarn/loader-utils-and-react-scripts-2.0.4"
            }
           steps {
              withSonarQubeEnv('qube') {
                sh '$SCANNER_HOME/bin/sonar-scanner'
              }
                }       
          }
    }
}
