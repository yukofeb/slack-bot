#!/bin/bash

host="ubuntu@ec2-35-166-167-209.us-west-2.compute.amazonaws.com"

MYSECURITYGROUP=sg-34fc6d51
MYIP=`curl -s inet-ip.info`

aws ec2 authorize-security-group-ingress --group-id $MYSECURITYGROUP --protocol tcp --port 22 --cidr $MYIP/32
ssh -i ~/.ssh/yukofeb.pem $host
/usr/local/bin/node /opt/slack-bot/index.js
aws ec2 revoke-security-group-ingress --group-id $MYSECURITYGROUP --protocol tcp --port 22 --cidr $MYIP/32

/usr/local/bin/node /opt/slack-bot/index.js