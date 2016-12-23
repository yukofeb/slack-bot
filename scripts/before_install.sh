#!/bin/bash

cd /opt/slack-bot
sudo apt-get install -y nodejs npm
sudo npm cache clean
sudo npm install n -g

sudo n 6.9.2
sudo ln -sf /usr/local/bin/node /usr/bin/node
sudo npm install
