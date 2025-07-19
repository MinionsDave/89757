FROM node:24.3.0
EXPOSE 3000

RUN apt-get update && \
    apt-get install -y mariadb-client && \
    rm -rf /var/lib/apt/lists/*

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
