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
      script {
        if (currentBuild.result == 'SUCCESS') {
          def gitCommit = env.GIT_COMMIT
          def buildUrl = env.BUILD_URL
          def repoUrl = env.GIT_URL
          def repoName = repoUrl.split("/").reverse()[0].split(".")[0]
          def repoOwner = repoUrl.split("/")[3]
          sh "curl -X POST -H 'Authorization: token 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' -H 'Accept: application/vnd.github+json' -d '{\"state\": \"success\", \"target_url\": \"${buildUrl}\", \"description\": \"Jenkins Build\", \"context\": \"unit-tests\"}' https://api.github.com/repos/${repoOwner}/${repoName}/statuses/${gitCommit}"
        }
      }
    }
  }
}
