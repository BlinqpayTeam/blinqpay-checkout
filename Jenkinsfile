
pipeline {
   agent any
   options {
      gitLabConnection('Gitlab Connection Jenkins')
    }

   stages {
       when {
               branch 'main-sdk-build'
        }
      stage('Build') {
         steps {
            echo 'Notify GitLab'
            updateGitlabCommitStatus name: 'build', state: 'pending'
            echo 'build step goes here'       
            updateGitlabCommitStatus name: 'build', state: 'success'
          }
       }
      stage('Test') {
        when {
               branch 'main-sdk-build'
        }
         steps {
            echo 'Notify GitLab for Test'
            updateGitlabCommitStatus name: 'test', state: 'pending'
            echo 'test step goes here'
            updateGitlabCommitStatus name: 'test', state: 'success'

           }
       }
      stage('Build Docker Image') {
        when {
               branch 'main-sdk-build'
        }
         steps {
            script {
               app = docker.build('registry.gitlab.com/blinqpayapis/blinqcheckoutreact')
            }
         }
      }
      stage('Push docker image') {
        when {
               branch 'main-sdk-build'
        }
         steps {
            script {
               docker.withRegistry('https://registry.gitlab.com/blinqpayapis/blinqcheckoutreact', 'gitlab-container-registry-token') {
                  app.push("${env.BUILD_NUMBER}")
                  app.push("latest")
               }
            }
         }
      }
      stage('DeployToProduction') {
        when {
               branch 'main-sdk-build'
        }
         steps {
             echo 'Deploying...'
             updateGitlabCommitStatus name: 'deploy', state: 'pending'
             withCredentials([sshUserPrivateKey(credentialsId: '5191ca4b-cec3-4da1-8d74-979825a4f839', 
               keyFileVariable: 'BLINQ_KEY', passphraseVariable: '', usernameVariable: 'jenkins')]) {
               script {
                  sh(
                     "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} root@165.22.47.120 \"docker pull registry.gitlab.com/blinqpayapis/blinqcheckoutreact:${env.BUILD_NUMBER}\""
                  )
                  try {
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} root@165.22.47.120 \"docker stop blinqsdk\""
                     )
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} root@165.22.47.120 \"docker rm blinqsdk\""
                     )
                  } catch (err) {
                     echo: 'caught error: $err'
                  }
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} root@165.22.47.120 \"docker run --restart always --name blinqsdk -p 5400:5400 -d registry.gitlab.com/blinqpayapis/blinqcheckoutreact:${env.BUILD_NUMBER}\""
                     )
                     sh 'echo $(curl localhost:5400)'

               }

               }
             echo 'Deployment complete'
             updateGitlabCommitStatus name: 'deploy', state: 'success'
         }
      }
    }
 }