FROM node:12.19.1-alpine
ARG VERSION

WORKDIR /app
RUN chown -R node:node /app
COPY packages/backend/package.json yarn.lock ./
USER node
RUN yarn install --silent --frozen-lockfile --production
COPY --chown=node:node docker/set-env-vars.sh docker/entrypoint.sh packages/backend/ ./
EXPOSE 8080
# ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "src/"]
ENV VERSION=${VERSION}
