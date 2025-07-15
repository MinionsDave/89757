FROM node:24.3.0
EXPOSE 30000
RUN mkdir /app \
    && npm i -g pnpm nrm
RUN nrm use taobao
WORKDIR /app
ADD package.json /app/package.json
ADD pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm i
COPY . /app
RUN npm run build
ENTRYPOINT ["node", "dist/main.js"]

# TODO: 容器需要安装mariadb-dump