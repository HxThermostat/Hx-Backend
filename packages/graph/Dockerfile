FROM node:12-bullseye AS build

WORKDIR /usr/src/hx

COPY ./package.json ./yarn.lock ./
COPY ./packages/graph/package.json ./packages/graph/package.json

RUN yarn install --frozen-lockfile

COPY ./tsconfig.json ./
COPY ./packages/graph/tsconfig.json ./packages/graph/
COPY ./packages/graph/src ./packages/graph/src

WORKDIR /usr/src/hx/packages/graph
RUN yarn build-ts

FROM node:12-bullseye

# Run Datadog's Debian one-line install with a bit of Docker-specific
# cleanup to keep the image small + to give the node user access to
# the relevant config files and logs
# ARG DD_API_KEY
# RUN DD_AGENT_MAJOR_VERSION=7 \
#     DD_API_KEY=$DD_API_KEY \
#     DD_INSTALL_ONLY=true \
#     DD_SITE="datadoghq.com" \
#     bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)" && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/* && \
#     chown -R node:node /etc/datadog-agent/ /opt/datadog-agent/ /var/log/datadog/

# Add tini as a basic init manager
RUN apt-get update && apt-get install -y \
  tini \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /usr/src/hx

COPY ./package.json ./yarn.lock ./
COPY ./packages/graph/package.json ./packages/graph/package.json

RUN SKIP_POSTINSTALL=1 yarn install --frozen-lockfile

COPY ./packages/graph/schema ./packages/graph/schema
COPY ./packages/graph/static ./packages/graph/static
COPY ./packages/graph/views ./packages/graph/views
COPY --from=build /usr/src/hx/packages/graph/dist /usr/src/hx/packages/graph/dist

# COPY ./packages/graph/entrypoint ./packages/graph/entrypoint
# RUN chmod u+x ./packages/graph/entrypoint

RUN chown node:node .
USER node

EXPOSE 3000

WORKDIR /usr/src/hx/packages/graph

ENTRYPOINT ["tini", "-s", "--"]
CMD ["node", "dist/index.js"]
