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
    com.docker.extension.screenshots='[{"alt":"Home Screen", "url":"https://user-images.githubusercontent.com/1651790/213393187-b01fd43a-9c65-4e11-b22b-9d531d4ef6c6.png"}, {"alt":"View Resources", "url":"https://user-images.githubusercontent.com/1651790/213393139-f6d28dac-099a-4c71-9c3e-0041d3047c2e.png"}, {"alt":"Web Console", "url":"https://user-images.githubusercontent.com/1651790/213393170-8f867f09-d7c1-4e99-ad88-dc6632cd334e.png"}, {"alt":"Documentation", "url":"https://user-images.githubusercontent.com/1651790/213393156-0a9bfdbb-557b-4dc7-8f37-95043ed6bb8f.png"}]' \
    com.docker.extension.detailed-description="NebulaGraph is a popular Open-Source, distributed Cloud Native Graph Database for trillion edges graph data volume." \
    com.docker.extension.publisher-url="https://github.com/vesoft-inc/nebula" \
    com.docker.extension.additional-urls='[{"title":"WebSite","url":"https://www.nebula-graph.io/"}, {"title":"GitHub","url":"https://github.com/vesoft-inc/nebula"}, {"title":"Feedback","url":"https://github.com/wey-gu/nebulagraph-docker-ext/issues/new/choose"}, {"title":"Slack","url":"http://community-chat.nebula-graph.io/"}]' \
    com.docker.extension.changelog="See https://github.com/wey-gu/nebulagraph-docker-ext/" \
    com.docker.desktop.extension.icon="https://user-images.githubusercontent.com/1651790/213339618-107d0e59-1b8b-4c89-bbae-5529aa4e2666.svg" \
    com.docker.extension.categories="database"

# COPY --from=builder /backend/bin/service /
COPY metadata.json .
COPY nebulagraph.svg .
COPY docker-compose.yaml .
COPY --from=client-builder /ui/build ui
# CMD /service -socket /run/guest-services/backend.sock

