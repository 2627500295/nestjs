FROM --platform=${TARGETPLATFORM} node:alpine

LABEL maintainer="microld<admin@microlove.me>"

ENV PORT=8080 HOST=0.0.0.0 NODE_ENV=production

EXPOSE 8080

WORKDIR /app/service

RUN apk add --no-cache tini libstdc++ chromium harfbuzz nss freetype ttf-freefont font-noto-emoji && apk add --no-cache wqy-zenhei --repository https://dl-cdn.alpinelinux.org/alpine/edge/testing --allow-untrusted;

COPY dist /app/service/

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "main.js"]