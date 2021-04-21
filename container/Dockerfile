# Path of the tap within the docker container
ARG DOC_APP_PATH=/keg/tap
ARG GIT_APP_URL=https://github.com/simpleviewinc/tap-events-force.git
ARG GIT_APP_BRANCH=master
# Flag to copy over the taps local folder instead of pulling from git
ARG KEG_COPY_LOCAL

# Add a FROM for the tap-base image to we can copy content from it
ARG KEG_BASE_IMAGE=ghcr.io/simpleviewinc/tap:develop
FROM $KEG_BASE_IMAGE as tap-base

ARG DOC_APP_PATH=/keg/tap
ENV DOC_APP_PATH=$DOC_APP_PATH

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

EXPOSE $KEG_PROXY_PORT

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
