
FROM registry.cn-shanghai.aliyuncs.com/lkl-common/nginx:1.16.0-alpine
COPY packages/agora-classroom-sdk/build/  /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/TCP
