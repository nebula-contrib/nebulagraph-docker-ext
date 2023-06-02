# FROM golang:1.19-alpine AS builder
# ENV CGO_ENABLED=0
# WORKDIR /backend
# COPY backend/go.* .
# RUN --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     go mod download
# COPY backend/. .
# RUN --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     go build -trimpath -ldflags="-s -w" -o bin/service

FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="NebulaGraph" \
    org.opencontainers.image.description="Easily deploy and test NebulaGraph, the Open-Source Distributed Graph Database." \
    org.opencontainers.image.vendor="Vesoft Inc." \
    com.docker.desktop.extension.api.version="0.3.3" \
    com.docker.extension.screenshots='[{"alt":"Home Screen", "url":"https://user-images.githubusercontent.com/1651790/215671209-07904ec5-ef3f-42bb-b9f1-64f8d52cb11d.png"}, {"alt":"View Resources", "url":"https://user-images.githubusercontent.com/1651790/215671203-9b7cca30-957c-4723-8fcb-8327678adbd2.png"}, {"alt":"Get Started", "url":"https://user-images.githubusercontent.com/1651790/215671195-8e5e3b30-f1f4-4337-8de5-33ad192386b9.png"}, {"alt":"Documentation", "url":"https://user-images.githubusercontent.com/1651790/215671185-87fefb0e-4600-4dd1-80c1-8a21122fb2f6.png"}]' \
    com.docker.extension.detailed-description="NebulaGraph is a popular Open-Source, distributed Cloud Native Graph Database for trillion edges graph data volume." \
    com.docker.extension.publisher-url="https://github.com/vesoft-inc/nebula" \
    com.docker.extension.additional-urls='[{"title":"WebSite","url":"https://www.nebula-graph.io/"}, {"title":"GitHub","url":"https://github.com/vesoft-inc/nebula"}, {"title":"Slack","url":"http://community-chat.nebula-graph.io/"}, {"title":"Docker Extension Feedback","url":"https://github.com/nebula-contrib/nebulagraph-docker-ext/issues/new/choose"}]' \
    com.docker.extension.changelog="Upgrade to NebulaGraph 3.5.0. See https://github.com/nebula-contrib/nebulagraph-docker-ext/" \
    com.docker.desktop.extension.icon="https://user-images.githubusercontent.com/1651790/213339618-107d0e59-1b8b-4c89-bbae-5529aa4e2666.svg" \
    com.docker.extension.categories="database"

# COPY --from=builder /backend/bin/service /
COPY metadata.json .
COPY nebulagraph.svg .
COPY docker-compose.yaml .
COPY --from=client-builder /ui/build ui
# CMD /service -socket /run/guest-services/backend.sock
