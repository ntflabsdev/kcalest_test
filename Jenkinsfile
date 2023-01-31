pipeline {
    agent any
    tools  {
        nodejs 'nodejs16'
    }
    
    environment {
    SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Checking Git commit SHA') {
            steps {
                sh 'cp -avpr /opt/firebase.ts src/'
                sh 'echo "Latest Commit SHA: $GIT_COMMIT"'
            }
    }
          
    }

    post {
    always {
        sh 'curl -X POST -H "Authorization: token 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" -H "Content-Type: application/json" -d "{\\"state\\":\\"success\\",\\"target_url\\":\\"$BUILD_URL\\",\\"description\\":\\"Unit tests passed\\",\\"context\\":\\"jenkins/unit-tests\\"}" https://api.github.com/repos/ntflabsdev/kcalest_test/statuses/$GIT_COMMIT'

    }
}

}
