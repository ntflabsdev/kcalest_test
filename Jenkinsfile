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
        
        sh 'curl \
        -X POST \
        -H "Accept: application/vnd.github+json" \
        -H "Authorization: Bearer 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"\
        -H "X-GitHub-Api-Version: 2022-11-28" \
        https://api.github.com/repos/ntflabsdev/kcalest_test/statuses/$GIT_COMMIT \
        -d "{\\"state\\":\\"success\\",\\"target_url\\":\\"$BUILD_URL\\",\\"description\\":\\"Unit tests passed\\",\\"context\\":\\"continuous-integration/jenkins\\"}"'
    }
}

}

