FROM --platform=${TARGETPLATFORM} node:alpine as builder

WORKDIR /app/service

COPY ./package.json /app/service/

COPY ./yarn.lock    /app/service/

COPY ./dist         /app/service/

RUN yarn install --production --pure-lockfile --no-progress;





FROM --platform=${TARGETPLATFORM} node:alpine

LABEL maintainer="microld<admin@microlove.me>"

ENV PORT=8080 HOST=0.0.0.0 NODE_ENV=production

EXPOSE 8080

WORKDIR /app/service

RUN apk add --no-cache tini;

COPY --from=builder /app/service/ /app/service/

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "main.js"]
