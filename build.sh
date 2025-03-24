#!/bin/bash

cd /home/araneumb/repositories/portfolio

npm install
npm run build

rsync -av --delete-delay build/ /home/araneumb/public_html/
