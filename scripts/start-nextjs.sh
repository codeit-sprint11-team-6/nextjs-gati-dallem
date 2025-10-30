#!/bin/bash 
set -e  

echo "------------ 어플리케이션 배포 시작 ------------"
cd /home/ubuntu/nextjs-gati-dallem || exit 1

# standalone 모드에서는 npm ci 불필요
echo "standalone 모드로 실행 중..."

pm2 kill
sleep 2
pm2 start .next/standalone/server.js --name "nextjs-app"

echo "------------ 어플리케이션 배포 완료 ------------"