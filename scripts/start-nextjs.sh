#!/bin/bash 
set -e  

echo "------------ 어플리케이션 배포 시작 ------------"
cd /home/ubuntu/nextjs-gati-dallem || exit 1

# npm ci 최적화 (캐시 활용, 상세 로그)
echo "의존성 설치 중..."
npm ci --prefer-offline --no-audit --no-fund

pm2 kill
sleep 2
pm2 start npm --name "nextjs-app" -- start

echo "------------ 어플리케이션 배포 완료 ------------"