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
    com.docker.extension.screenshots="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog=""

# COPY --from=builder /backend/bin/service /
COPY metadata.json .
COPY nebulagraph.svg .
COPY docker-compose.yaml .
COPY --from=client-builder /ui/build ui
# CMD /service -socket /run/guest-services/backend.sock

