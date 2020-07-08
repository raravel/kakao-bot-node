#!/bin/sh

forever stopall
P="/home/youn/proj/node/kakao/pc-bot/"
LOGF="$(date +%Y%M%d-%H%M%S).log"
LOGP="${P}.logs/"

mkdir $LOGP > /dev/null 2>&1

cd $P
forever -p '/home/youn/proj/node/kakao/pc-bot/' -l "${LOGP}$LOGF" start "index.js"
sleep 3
forever list
