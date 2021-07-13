#!/bin/bash

if [ "$ENV" == "" ] 
then
   echo "missing env,please input ENV=review|prod"
   return 1
fi

if [ "$VERSION" == "" ]
then
   VERSION=$(date "+%Y%m%d%H%M%S")
fi

APP_ENV=$ENV
APP_NAME=www-cloud-room
APP_VERSION=0.1
 
if [ "$ENV" == "prod" ] 
then
    DOCKER_REPO_SPACENAME=zx-prod
else 
    DOCKER_REPO_SPACENAME=lkl-review #zx_dev 
fi

echo "build <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
# 清理
rm -rf packages/agora-classroom-sdk/build

# NODE 准备
nvm ls
nvm use 12.16.2
#nvm use 12.2

# 安装 JUST
npm --registry https://registry.npm.taobao.org i just-scripts -g
npm install lerna -g

# 第三分包
yarn install 
yarn bootstrap

# 构建
yarn ci:build:web


echo "docker <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
docker rmi $APP_NAME:$APP_VERSION 2>/dev/null
docker build -t $APP_NAME:$APP_VERSION .

echo "release <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
docker tag $APP_NAME:$APP_VERSION registry.cn-shanghai.aliyuncs.com/$DOCKER_REPO_SPACENAME/$APP_NAME:$APP_VERSION
docker push registry.cn-shanghai.aliyuncs.com/$DOCKER_REPO_SPACENAME/$APP_NAME:$APP_VERSION

echo "success <<<<<<<<<"

