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
            steps {
                sh 'cp -avpr /opt/firebase.ts src/'
            }
    }
        
      
           }
}
