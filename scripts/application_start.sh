#!/bin/bash
echo `date` >> start_log.txt
forever stopall >> start_log.txt
forever start /opt/slack-bot/index.js >> start_log.txt