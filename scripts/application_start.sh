#!/bin/bash
LOG='start_log.txt'

echo `date` >> $LOG
forever stopall >> $LOG
forever start /opt/slack-bot/index.js >> $LOG
forever list >> $LOG