#!/bin/bash

cd /home/araneumb/repositories/portfolio

npm install
npm run build

rm -rf /home/araneumb/public_html/*
cp -r build/* /home/araneumb/public_html/
