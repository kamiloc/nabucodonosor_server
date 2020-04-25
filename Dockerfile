# Stage 1
FROM node:10
ARG build_env
ENV PORT=8000

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

CMD [ "node", "dist/index.js" ]
EXPOSE 8000
