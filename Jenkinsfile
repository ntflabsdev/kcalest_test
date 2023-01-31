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
                // sh 'cp -avpr /opt/firebase.ts src/'
                sh 'npm test'
                sh 'echo "Latest Commit SHA: $GIT_COMMIT"'
            }

        post {
        success {
            
            sh 'curl \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $GITHUB_SECRET_TOKEN"\
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/ntflabsdev/kcalest_test/statuses/$GIT_COMMIT \
            -d "{\\"state\\":\\"success\\",\\"target_url\\":\\"$BUILD_URL\\",\\"description\\":\\"Unit tests passed on kcalest\\",\\"context\\":\\"continuous-integration/jenkins\\"}"'
        }
        failure {
            
            sh 'curl \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $GITHUB_SECRET_TOKEN"\
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/ntflabsdev/kcalest_test/statuses/$GIT_COMMIT \
            -d "{\\"state\\":\\"failure\\",\\"target_url\\":\\"$BUILD_URL\\",\\"description\\":\\"Unit tests failed on kcalest\\",\\"context\\":\\"continuous-integration/jenkins\\"}"'
        }
    }

        }
        stage('check for failed') {
            steps {
                sh 'npm install'
            }

        post {
        success {
            sh 'echo "you got this"'
            
        }
        failure {

            sh 'echo "nope next time"'
            
        }
    }

        }
          
     }

    



}

