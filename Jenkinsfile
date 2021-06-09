pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Integrate') {
      steps {
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'sonar-scanner -Dsonar.login="$sonar_login"'
        sh 'zip -r -q result.zip dist'
        sh 'curl -v -F user="admin" pwd=$webhook_site -F file=@result.zip http://amrita-elective.tk:4000/new-frontend-build'
      }
    }

    stage('Cleanup') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true, disableDeferredWipeout: true)
      }
    }

  }
}