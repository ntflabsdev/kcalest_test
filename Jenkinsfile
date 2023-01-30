pipeline {
    agent any
    tools  {
        nodejs 'nodejs16'
    }
    
    environment {
    SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('dependencies install') {
            when {
                branch "dependabot/npm_and_yarn/loader-utils-and-react-scripts-2.0.4"
            }
            steps {
                sh 'npm install'
                sh 'cp -avpr /opt/firebase.ts src/'
            }
    }
        
        } 
           }
}
