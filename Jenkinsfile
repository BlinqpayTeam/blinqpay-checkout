
pipeline {
   agent any
   options {
      gitLabConnection('Gitlab Connection Jenkins')
    }

   stages {
      stage('StagingBuild') {
            when {
                branch 'main-sdk-build'
            }
               environment {
                  WEB_CHECKOUT_BASE_URL     = credentials("WEB_CHECKOUT_BASE_URL_STAGING")
                  CHECKOUT_PAYMENT_BASE_URL = credentials("CHECKOUT_PAYMENT_BASE_URL_STAGING")
               }
         steps {
            echo 'Notify GitLab'
            updateGitlabCommitStatus name: 'build', state: 'pending'
            echo 'build step goes here'   
            sh 'touch .env'
            sh 'echo "" >> .env'
            sh 'echo WEB_CHECKOUT_BASE_URL=${WEB_CHECKOUT_BASE_URL} >> .env'
            sh 'echo CHECKOUT_PAYMENT_BASE_URL=${CHECKOUT_PAYMENT_BASE_URL} >> .env'      
            updateGitlabCommitStatus name: 'build', state: 'success'
          }
       }
       stage('ProductionBuild') {
            when {
                branch 'sdk-build-prod'
            }
               environment {
                  WEB_CHECKOUT_BASE_URL     = credentials("WEB_CHECKOUT_BASE_URL")
                  CHECKOUT_PAYMENT_BASE_URL = credentials("CHECKOUT_PAYMENT_BASE_URL")
               }
         steps {
            echo 'Notify GitLab'
            updateGitlabCommitStatus name: 'build', state: 'pending'
            echo 'build step goes here' 
            sh 'touch .env'
            sh 'echo "" >> .env'
            sh 'echo WEB_CHECKOUT_BASE_URL=${WEB_CHECKOUT_BASE_URL} >> .env'
            sh 'echo CHECKOUT_PAYMENT_BASE_URL=${CHECKOUT_PAYMENT_BASE_URL} >> .env'  
            updateGitlabCommitStatus name: 'build', state: 'success'
          }
       }
      stage('Test') {
         steps {
            echo 'Notify GitLab for Test'
            updateGitlabCommitStatus name: 'test', state: 'pending'
            echo 'test step goes here'
            updateGitlabCommitStatus name: 'test', state: 'success'

           }
       }
      stage('Build Docker Image') {
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
      stage('DeployToStaging') {
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

      stage('DeployToProduction') {
               when {
                  branch 'sdk-build-prod'
               }
               environment {
                  PROD_USERNAME = credentials("gateway-production-username")
                  PROD_IP       = credentials("gateway-production-ip")
               }
         steps {
             echo 'Deploying to production...'
             updateGitlabCommitStatus name: 'deployproduction', state: 'pending'
             withCredentials([sshUserPrivateKey(credentialsId: '5191ca4b-cec3-4da1-8d74-979825a4f839', 
               keyFileVariable: 'BLINQ_KEY', passphraseVariable: '', usernameVariable: 'jenkins')]) {
               script {
                  sh(
                     "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} ${PROD_USERNAME}@${PROD_IP} \"docker pull registry.gitlab.com/blinqpayapis/blinqcheckoutreact:${env.BUILD_NUMBER}\""
                  )
                  try {
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} ${PROD_USERNAME}@${PROD_IP} \"docker stop blinqsdk\""
                     )
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} ${PROD_USERNAME}@${PROD_IP} \"docker rm blinqsdk\""
                     )
                  } catch (err) {
                     echo: 'caught error: $err'
                  }
                     sh(
                        "ssh -o StrictHostKeyChecking=no -i ${BLINQ_KEY} ${PROD_USERNAME}@${PROD_IP} \"docker run --net blinqnetwork --restart always --name blinqsdk -p 5400:5400 -d registry.gitlab.com/blinqpayapis/blinqcheckoutreact:${env.BUILD_NUMBER}\""
                     )
                     sh 'echo $(curl localhost:8001)'

               }

               }
             echo 'Deployment to production complete'
             updateGitlabCommitStatus name: 'deployproduction', state: 'success'
            //  sh './deploy-script.sh'j //
         }
      }


    }
 }