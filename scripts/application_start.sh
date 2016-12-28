#!/bin/bash
id
forever stopall
forever start /opt/slack-bot/index.js
forever list