FROM node:12-bullseye AS build

ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG http_proxy
ARG https_proxy

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY
ENV http_proxy=$http_proxy
ENV https_proxy=$https_proxy
RUN env | grep -i proxy

COPY packages/graph/RB_RootCA_RSA_G01.crt /usr/local/share/ca-certificates/
RUN apt-get update \
    && apt-get install -y ca-certificates \
    && update-ca-certificates

WORKDIR /usr/src/hx

COPY ./package.json ./yarn.lock ./
COPY ./packages/graph/package.json ./packages/graph/package.json

RUN yarn install --frozen-lockfile --network-timeout 120000

COPY ./tsconfig.json ./
COPY ./packages/graph/tsconfig.json ./packages/graph/
COPY ./packages/graph/src ./packages/graph/src

WORKDIR /usr/src/hx/packages/graph
RUN yarn build-ts

FROM node:12-bullseye

# Run Datadog's Debian one-line install with a bit of Docker-specific
# cleanup to keep the image small + to give the node user access to
# the relevant config files and logs
ARG DD_API_KEY

RUN if [ -n "$DD_API_KEY" ]; then \
        echo "DD_API_KEY is present. Installing Datadog Agent..." && \
        DD_AGENT_MAJOR_VERSION=7 \
        DD_API_KEY=$DD_API_KEY \
        DD_INSTALL_ONLY=true \
        DD_SITE="datadoghq.com" \
        bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)" && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/* && \
        chown -R node:node /etc/datadog-agent/ /opt/datadog-agent/ /var/log/datadog/; \
    else \
        echo "DD_API_KEY is missing. Skipping Datadog Agent installation."; \
    fi

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
COPY ./.well-known ./packages/graph/static/.well-known
COPY ./packages/graph/views ./packages/graph/views
COPY --from=build /usr/src/hx/packages/graph/dist /usr/src/hx/packages/graph/dist

# COPY ./packages/graph/entrypoint ./packages/graph/entrypoint
# RUN chmod u+x ./packages/graph/entrypoint

RUN chown node:node .
USER node

EXPOSE 3000

WORKDIR /usr/src/hx/packages/graph

# ENTRYPOINT ["tini", "--", "./entrypoint"]
CMD ["node", "dist/index.js"]

 