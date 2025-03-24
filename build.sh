#!/bin/bash

# Navigate to the repo folder (adjust this path if needed)
cd /home/araneumb/repositories/portfolio

# Install dependencies
npm install

# Build the project
npm run build

# Copy the build folder to your public_html or desired folder
rm -rf /home/araneumb/public_html/*
cp -r build/* /home/araneumb/public_html/
