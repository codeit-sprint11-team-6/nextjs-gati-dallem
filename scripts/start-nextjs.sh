#!/bin/bash 
set -e  

echo "------------ 어플리케이션 배포 시작 ------------"
cd /home/ubuntu/nextjs-gati-dallem || exit 1
npm ci
pm2 kill
sleep 2
pm2 start npm --name "nextjs-app" -- start

echo "------------ 어플리케이션 배포 완료 ------------"