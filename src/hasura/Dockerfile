FROM alpine as builder
RUN apk add curl
RUN ["curl", "-L", "https://github.com/hasura/graphql-engine/raw/master/cli/get.sh | INSTALL_PATH=$HOME/bin/sh"]
RUN ["/bin/sh", "-c", "hasura metadata track --all-tables --all-relationships --schema dota2"]
FROM hasura/graphql-engine
# RUN ["hasura", "metadata", "track", "--all-tables", "--all-relationships", "--schema", "dota2"]
COPY --from=builder . .