slack-bot
=============

# Memo
## How to install in Ubuntu

```
$ sudo apt-get install -y nodejs npm
$ sudo npm cache clean
$ sudo npm install n -g

$ sudo n 6.9.2
$ sudo ln -sf /usr/local/bin/node /usr/bin/node
```

## Set Environment Variables

```
// After login ec2
$ cat /home/ubuntu/.profile
...
# for AWS
export SLACK_API_TOKEN='***'
export G_ACCESS_KEY='***'
```

## CircleCI Settings
[Configuring CircleCI \- CircleCI](https://circleci.com/docs/configuration/)
[Continuous Deployment with Amazon S3 \- CircleCI](https://circleci.com/docs/continuous-deployment-with-amazon-s3/)
[Environment variables \- CircleCI](https://circleci.com/docs/environment-variables/)