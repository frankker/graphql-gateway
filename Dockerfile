FROM node:lts-slim

# TODO: Port 8080 is hardwired in our ONTrackOperator,
# see https://git.asmgmt.hilti.com/infra/ontrack-operator/-/issues/3
ENV PORT=8080
ENV TIME_AND_ATTENDANCE_BASE_URI="env_missing-time_and_attendance_base_uri"

# Keep the image updated to avoid any CVE
RUN apt-get update && \
    apt-get upgrade --no-install-recommends -y && \
    rm -rf /var/lib/apt/lists/*  \

EXPOSE $PORT

WORKDIR /app
COPY ["package.json", "yarn.lock", "index.js", "./"]
RUN yarn install --prod

CMD [ "node", "index.js" ]
